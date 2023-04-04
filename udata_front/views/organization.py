import itertools

from flask import g, abort, redirect, url_for, request
from flask_security import current_user

from udata import search
from udata.frontend import csv
from udata_front.views.base import DetailView, SearchView
from udata.i18n import I18nBlueprint
from udata.models import (
    Organization, Reuse, Dataset, Follow, Discussion
)
from udata.sitemap import sitemap
from udata.core.dataset.csv import (
    DatasetCsvAdapter, DiscussionCsvAdapter, ResourcesCsvAdapter
)
from udata.core.dataset.search import DatasetSearch
from udata.core.organization.permissions import (
    EditOrganizationPermission, OrganizationPrivatePermission
)
from udata.core.organization.search import OrganizationSearch
from udata.utils import not_none_dict

blueprint = I18nBlueprint('organizations', __name__,
                          url_prefix='/organizations')


@blueprint.before_app_request
def set_g_user_orgs():
    if current_user.is_authenticated:
        g.user_organizations = current_user.organizations


@blueprint.route('/', endpoint='list')
class OrganizationListView(SearchView):
    model = Organization
    context_name = 'organizations'
    template_name = 'organization/list.html'
    search_adapter = OrganizationSearch
    page_size = 21


class OrgView(object):
    model = Organization
    object_name = 'org'

    @property
    def organization(self):
        return self.get_object()

    def get_context(self):
        context = super(OrgView, self).get_context()
        context['can_edit'] = EditOrganizationPermission(self.organization)
        context['can_view'] = OrganizationPrivatePermission(self.organization)
        return context


class ProtectedOrgView(OrgView):
    def can(self, *args, **kwargs):
        permission = EditOrganizationPermission(self.organization)
        return permission.can()


@blueprint.route('/<org:org>/', endpoint='show')
class OrganizationDetailView(SearchView, OrgView, DetailView):
    template_name = 'organization/display.html'
    model = Dataset
    search_adapter = DatasetSearch
    context_name = 'datasets'
    reuse_page_size = 8

    def get_queryset(self):
        parser = self.search_adapter.as_request_parser()
        args = not_none_dict(parser.parse_args())
        args.update(organization=self.organization.id)
        return search.query(self.search_adapter, **args)

    def get_context(self):
        context = super(OrganizationDetailView, self).get_context()
        params_reuses_page = request.args.get('reuses_page', 1, type=int)

        can_edit = EditOrganizationPermission(self.organization)
        can_view = OrganizationPrivatePermission(self.organization)

        if self.organization.deleted and not can_view.can():
            abort(410)

        datasets = Dataset.objects(
            organization=self.organization)

        reuses = Reuse.objects(
            organization=self.organization).order_by(
            '-metrics.reuses', '-metrics.followers')

        followers = (Follow.objects.followers(self.organization)
                     .order_by('follower.fullname'))

        if not can_view:
            reuses = reuses.visible()
            datasets = datasets.visible()

        context.update({
            'reuses': reuses.paginate(params_reuses_page, self.reuse_page_size),
            'total_datasets': context.get("datasets").total,
            'organization_datasets': len(datasets),
            'total_reuses': len(reuses),
            'followers': followers,
            'can_edit': can_edit,
            'can_view': can_view,
        })
        return context


@blueprint.route('/<org:org>/dashboard/', endpoint='dashboard')
def organization_dashboard(org):
    return redirect('%s#dashboard' % url_for('organizations.show', org=org), code=301)


@blueprint.route('/<org:org>/datasets.csv')
def datasets_csv(org):
    datasets = Dataset.objects(organization=str(org.id)).visible()
    adapter = DatasetCsvAdapter(datasets)
    return csv.stream(adapter, '{0}-datasets'.format(org.slug))


@blueprint.route('/<org:org>/discussions.csv')
def discussions_csv(org):
    datasets = Dataset.objects.filter(organization=str(org.id))
    discussions = [Discussion.objects.filter(subject=dataset)
                   for dataset in datasets]
    # Turns a list of lists into a flat list.
    adapter = DiscussionCsvAdapter(itertools.chain(*discussions))
    return csv.stream(adapter, '{0}-discussions'.format(org.slug))


@blueprint.route('/<org:org>/datasets-resources.csv')
def datasets_resources_csv(org):
    datasets = Dataset.objects(organization=str(org.id)).visible()
    adapter = ResourcesCsvAdapter(datasets)
    return csv.stream(adapter, '{0}-datasets-resources'.format(org.slug))


@sitemap.register_generator
def sitemap_urls():
    for org in Organization.objects.visible().only('id', 'slug'):
        yield 'organizations.show_redirect', {'org': org}, None, 'weekly', 0.7
