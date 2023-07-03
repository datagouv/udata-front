import logging
import requests

from flask import request, redirect, url_for, current_app, abort, make_response
from mongoengine.errors import DoesNotExist
from feedgenerator.django.utils.feedgenerator import Atom1Feed

from udata.app import cache
from udata.core.activity.models import Activity
from udata.core.dataset.api import DatasetApiParser
from udata.core.dataset.csv import ResourcesCsvAdapter
from udata.core.dataset.models import Dataset
from udata.core.organization.api import OrgApiParser
from udata.core.organization.csv import OrganizationCsvAdapter
from udata.core.organization.models import Organization
from udata.core.post.models import Post
from udata.core.reuse.api import ReuseApiParser
from udata.core.reuse.csv import ReuseCsvAdapter
from udata.core.reuse.models import Reuse
from udata.harvest.csv import HarvestSourceCsvAdapter
from udata.harvest.models import HarvestSource
from udata.frontend import csv
from udata.i18n import I18nBlueprint
from udata.sitemap import sitemap
from udata.utils import multi_to_dict
from udata_front import theme

from udata.core.site.models import current_site

blueprint = I18nBlueprint('site', __name__)

log = logging.getLogger(__name__)


@blueprint.app_context_processor
def inject_site():
    return dict(current_site=current_site)


@blueprint.route('/activity.atom')
def activity_feed():
    # TODO: doesn't seem tested. Is it used somewhere?
    activity_keys = request.args.getlist('key')

    feed = Atom1Feed(
        current_app.config.get('SITE_TITLE'), feed_url=request.url,
        link=request.url_root, description=None)
    activities = (Activity.objects.order_by('-created_at')
                                  .limit(current_site.feed_size))

    for activity in activities.select_related():
        # filter by activity.key
        # /!\ this won't completely honour `feed_size` (only as a max value)
        if activity_keys and activity.key not in activity_keys:
            continue
        try:
            owner = activity.actor or activity.organization
        except DoesNotExist:
            owner = 'deleted'
            owner_url = None
        else:
            owner_url = owner.url_for(_external=True)
        try:
            related = activity.related_to
        except DoesNotExist:
            related = 'deleted'
            related_url = None
        else:
            related_url = related.url_for(_external=True)
        feed.add_item(
            id='%s#activity=%s' % (
                url_for('site.dashboard', _external=True), activity.id),
            title='%s by %s on %s' % (
                activity.key, owner, related),
            description=None,
            link=related_url,
            author_name=owner,
            author_link=owner_url,
            updateddate=activity.created_at
        )
    response = make_response(feed.writeString('utf-8'))
    response.headers['Content-Type'] = 'application/atom+xml'
    return response


@blueprint.route('/')
def home():
    context = {
        'spd_datasets': Dataset.objects.filter(badges__kind='spd'),
        'recent_datasets': Dataset.objects.visible(),
        'recent_reuses': Reuse.objects(featured=True).visible(),
        'last_post': Post.objects.published().first()
    }
    processor = theme.current.get_processor('home')
    context = processor(context)
    return theme.render('home.html', **context)


def get_export_url(model):
    did = current_app.config['EXPORT_CSV_DATASET_ID']
    dataset = Dataset.objects.get_or_404(id=did)
    resource = None
    for r in dataset.resources:
        if r.extras.get('csv-export:model', '') == model:
            resource = r
            break
    if not resource:
        abort(404)
    return resource.url


@blueprint.route('/datasets.csv')
def datasets_csv():
    params = multi_to_dict(request.args)
    # redirect to EXPORT_CSV dataset if feature is enabled and no filter is set
    exported_models = current_app.config.get('EXPORT_CSV_MODELS', [])
    if not params and 'dataset' in exported_models:
        return redirect(get_export_url('dataset'))
    params['facets'] = False
    datasets = DatasetApiParser.parse_filters(Dataset.objects.visible(), params)
    adapter = csv.get_adapter(Dataset)
    return csv.stream(adapter(datasets), 'datasets')


@blueprint.route('/resources.csv')
def resources_csv():
    params = multi_to_dict(request.args)
    # redirect to EXPORT_CSV dataset if feature is enabled and no filter is set
    exported_models = current_app.config.get('EXPORT_CSV_MODELS', [])
    if not params and 'resource' in exported_models:
        return redirect(get_export_url('resource'))
    params['facets'] = False
    datasets = DatasetApiParser.parse_filters(Dataset.objects.visible(), params)
    return csv.stream(ResourcesCsvAdapter(datasets), 'resources')


@blueprint.route('/organizations.csv')
def organizations_csv():
    params = multi_to_dict(request.args)
    # redirect to EXPORT_CSV dataset if feature is enabled and no filter is set
    exported_models = current_app.config.get('EXPORT_CSV_MODELS', [])
    if not params and 'organization' in exported_models:
        return redirect(get_export_url('organization'))
    params['facets'] = False
    organizations = OrgApiParser.parse_filters(Organization.objects.visible(), params)
    return csv.stream(OrganizationCsvAdapter(organizations), 'organizations')


@blueprint.route('/reuses.csv')
def reuses_csv():
    params = multi_to_dict(request.args)
    # redirect to EXPORT_CSV dataset if feature is enabled and no filter is set
    exported_models = current_app.config.get('EXPORT_CSV_MODELS', [])
    if not params and 'reuse' in exported_models:
        return redirect(get_export_url('reuse'))
    params['facets'] = False
    reuses = ReuseApiParser.parse_filters(Reuse.objects.visible(), params)
    return csv.stream(ReuseCsvAdapter(reuses), 'reuses')


@blueprint.route('/harvests.csv')
def harvests_csv():
    # redirect to EXPORT_CSV dataset if feature is enabled
    exported_models = current_app.config.get('EXPORT_CSV_MODELS', [])
    if 'harvest' in exported_models:
        return redirect(get_export_url('harvest'))
    adapter = HarvestSourceCsvAdapter(
        HarvestSource.objects.filter(deleted=None).order_by('created_at')
    )
    return csv.stream(adapter, 'harvest')


class SiteView(object):
    @property
    def site(self):
        return current_site

    object = site


@blueprint.route('/dashboard/', endpoint='dashboard')
def site_dashboard():
    context = {
        'update_date': Dataset.objects.filter(badges__kind='spd'),
        'recent_datasets': Dataset.objects.visible(),
        'recent_reuses': Reuse.objects(featured=True).visible(),
        'last_post': Post.objects.published().first()
    }
    return theme.render('site/dashboard.html', **context)


@cache.cached(50)
def get_terms_content():
    filename = current_app.config['SITE_TERMS_LOCATION']
    if filename.startswith('http'):
        # We let the error appear because:
        # - we dont want to cache false responses
        # - this is only visible on terms
        response = requests.get(filename, timeout=5)
        response.raise_for_status()
        return response.text
    else:
        with open(filename) as terms:
            return terms.read()


@blueprint.route('/terms/')
def terms():
    content = get_terms_content()
    return theme.render('terms.html', terms=content)


@sitemap.register_generator
def site_sitemap_urls():
    yield 'site.home_redirect', {}, None, 'daily', 1
    yield 'site.dashboard_redirect', {}, None, 'weekly', 0.6
    yield 'site.terms_redirect', {}, None, 'monthly', 0.2
