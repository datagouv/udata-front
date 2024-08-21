from collections import defaultdict, OrderedDict

from flask import abort, request, url_for, redirect, make_response
from feedgenerator.django.utils.feedgenerator import Atom1Feed

from udata.models import Reuse, Follow
from udata.core.dataset.models import Dataset, get_resource
from udata.core.dataset.constants import RESOURCE_TYPES
from udata.core.dataset.search import DatasetSearch
from udata.core.dataset.permissions import ResourceEditPermission, DatasetEditPermission
from udata.core.dataservices.models import Dataservice
from udata.core.site.models import current_site

from udata_front.theme import render as render_template
from udata_front.views.base import DetailView, LoginOnlyView, SearchView
from udata.i18n import I18nBlueprint, gettext as _, ngettext
from udata.sitemap import sitemap


blueprint = I18nBlueprint('datasets', __name__, url_prefix='/datasets')


@blueprint.route('/recent.atom')
def recent_feed():
    feed = Atom1Feed(_('Last datasets'), description=None,
                     feed_url=request.url, link=request.url_root)
    datasets = (Dataset.objects.visible().order_by('-created_at_internal')
                .limit(current_site.feed_size))
    for dataset in datasets:
        author_name = None
        author_uri = None
        if dataset.organization:
            author_name = dataset.organization.name
            author_uri = url_for('organizations.show',
                                 org=dataset.organization.id, _external=True)
        elif dataset.owner:
            author_name = dataset.owner.fullname
            author_uri = url_for('users.show',
                                 user=dataset.owner.id, _external=True)
        feed.add_item(dataset.title,
                      description=dataset.description,
                      content=render_template('dataset/feed_item.html', dataset=dataset),
                      author_name=author_name,
                      author_link=author_uri,
                      link=url_for('datasets.show', dataset=dataset.id, _external=True),
                      updateddate=dataset.last_modified,
                      pubdate=dataset.created_at)
    response = make_response(feed.writeString('utf-8'))
    response.headers['Content-Type'] = 'application/atom+xml'
    return response


@blueprint.route('/', endpoint='list')
class DatasetListView(SearchView):
    model = Dataset
    search_adapter = DatasetSearch
    context_name = 'datasets'
    template_name = 'dataset/list.html'


class DatasetView(object):
    model = Dataset
    object_name = 'dataset'

    @property
    def dataset(self):
        return self.get_object()

    def get_context(self):
        return super(DatasetView, self).get_context()


class ProtectedDatasetView(DatasetView):
    def can(self, *args, **kwargs):
        permission = DatasetEditPermission(self.dataset)
        return permission.can()


@blueprint.route('/<dataset:dataset>/', endpoint='show')
class DatasetDetailView(DatasetView, DetailView):
    template_name = 'dataset/display.html'
    dataservice_page_size = 8
    reuse_page_size = 8

    def dispatch_request(self, *args, **kwargs):
        return super(DatasetDetailView, self).dispatch_request(*args, **kwargs)

    def get_context(self):
        context = super(DatasetDetailView, self).get_context()

        params_dataservices_page = request.args.get("dataservices_page", 1, type=int)
        dataservices = Dataservice.objects(datasets=self.dataset).visible()

        params_reuses_page = request.args.get('reuses_page', 1, type=int)
        reuses = Reuse.objects(datasets=self.dataset).visible()

        if not DatasetEditPermission(self.dataset).can():
            if self.dataset.private:
                abort(404)
            elif self.dataset.deleted:
                abort(410)

        context["dataservices"] = dataservices.paginate(
            params_dataservices_page, self.dataservice_page_size
        )
        context["total_dataservices"] = len(dataservices)

        context['reuses'] = reuses.paginate(params_reuses_page, self.reuse_page_size)
        context['total_reuses'] = len(reuses)

        context['can_edit'] = DatasetEditPermission(self.dataset)
        context['can_edit_resource'] = ResourceEditPermission
        return context


@blueprint.route('/publishing-form/', endpoint='publishing-form')
class PublishingFormView(LoginOnlyView):
    template_name = 'dataset/publishing-form.html'


@blueprint.route('/<dataset:dataset>/followers/', endpoint='followers')
class DatasetFollowersView(DatasetView, DetailView):
    template_name = 'dataset/followers.html'

    def get_context(self):
        context = super(DatasetFollowersView, self).get_context()
        context['followers'] = (Follow.objects.followers(self.dataset)
                                              .order_by('follower.fullname'))
        return context


@blueprint.route('/r/<uuid:id>', endpoint='resource')
def resource_redirect(id):
    '''
    Redirect to the latest version of a resource given its identifier.
    '''
    resource = get_resource(id)
    return redirect(resource.url.strip()) if resource else abort(404)


@sitemap.register_generator
def sitemap_urls():
    for dataset in Dataset.objects.visible().only('id', 'slug'):
        yield ('datasets.show_redirect', {'dataset': dataset},
               None, 'weekly', 0.8)


@blueprint.app_template_filter()
def group_resources_by_type(resources):
    """Group a list of `resources` by `type` with order"""
    groups = defaultdict(list)
    for resource in resources:
        groups[getattr(resource, 'type')].append(resource)
    ordered = OrderedDict()
    plurals = dict([
        ('main', ngettext("%(num)d Main file", "%(num)d Main files", len(groups['main']))),
        ('documentation', ngettext(
            '%(num)d Documentation',
            '%(num)d Documentations',
            len(groups['documentation'])
        )),
        ('update', ngettext('%(num)d Update', '%(num)d Updates', len(groups['update']))),
        ('api', ngettext('%(num)d API', '%(num)d APIs', len(groups['api']))),
        ('code', ngettext(
            '%(num)d Code repository',
            '%(num)d Code repositories',
            len(groups['code'])
        )),
        ('other', ngettext('%(num)d Other', '%(num)d Others', len(groups['other']))),
    ])
    for rtype in RESOURCE_TYPES.keys():
        if groups[rtype]:
            ordered[(rtype, plurals[rtype])] = groups[rtype]
    return ordered


@blueprint.app_template_filter()
def group_resources_by_schema(resources):
    """Group a list of `resources` by `schema`"""
    groups = dict()
    for resource in resources:
        if resource.schema and resource.schema.name:
            if resource.schema.name not in groups:
                groups[resource.schema.name] = resource.schema
    return groups
