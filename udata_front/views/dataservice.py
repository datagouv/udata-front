from flask import abort, make_response, request, url_for
from feedgenerator.django.utils.feedgenerator import Atom1Feed

from jinja2 import TemplateNotFound
from udata.core.dataservices.models import Dataservice
from udata.core.dataservices.permissions import DataserviceEditPermission
from udata.core.site.models import current_site
from udata.i18n import I18nBlueprint, gettext as _
from udata.sitemap import sitemap
from flask_mongoengine.pagination import Pagination

from udata_front import theme
from udata_front.theme import render as render_template
from udata_front.views.base import DetailView, LoginOnlyView

blueprint = I18nBlueprint('dataservices', __name__, url_prefix='/dataservices')


@blueprint.route('/recent.atom')
def recent_feed():
    feed = Atom1Feed(_('Last datasets'), description=None,
                     feed_url=request.url, link=request.url_root)
    dataservices = (Dataservice.objects.visible().order_by('-created_at_internal')
                    .limit(current_site.feed_size))
    for dataservice in dataservices:
        author_name = None
        author_uri = None
        if dataservice.organization:
            author_name = dataservice.organization.name
            author_uri = url_for('organizations.show',
                                 org=dataservice.organization.id, _external=True)
        elif dataservice.owner:
            author_name = dataservice.owner.fullname
            author_uri = url_for('users.show',
                                 user=dataservice.owner.id, _external=True)
        feed.add_item(dataservice.title,
                      description=dataservice.description,
                      content=render_template('dataservice/feed_item.html',
                                              dataservice=dataservice),
                      author_name=author_name,
                      author_link=author_uri,
                      link=url_for('dataservices.show', dataservice=dataservice.id, _external=True),
                      updateddate=dataservice.metadata_modified_at,
                      pubdate=dataservice.created_at)
    response = make_response(feed.writeString('utf-8'))
    response.headers['Content-Type'] = 'application/atom+xml'
    return response


@blueprint.route("/", endpoint="list")
def dataservices_list():
    try:
        return theme.render("dataservice/list.html")
    except TemplateNotFound:
        abort(404)


class DataserviceView(object):
    model = Dataservice
    object_name = 'dataservice'

    @property
    def dataservice(self):
        return self.get_object()

    def get_context(self):
        return super(DataserviceView, self).get_context()


@blueprint.route('/<dataservice:dataservice>/', endpoint='show')
class DataserviceDetailView(DataserviceView, DetailView):
    template_name = 'dataservice/display.html'

    def dispatch_request(self, *args, **kwargs):
        return super(DataserviceDetailView, self).dispatch_request(*args, **kwargs)

    def get_context(self):
        context = super(DataserviceDetailView, self).get_context()

        if not DataserviceEditPermission(self.dataservice).can():
            if self.dataservice.private:
                abort(404)
            elif self.dataservice.deleted_at:
                abort(410)

        datasets = Pagination(
            self.dataservice.datasets,
            request.args.get('datasets_page', 1, type=int),
            8,
        )

        context['datasets'] = datasets

        # Load the lazy references (could be better to fetch them in one request instead of 8)
        # We need to have a seperate variable because .fetch() return the object instead of
        # setting it inside the LazyReference object.
        context['datasets_items'] = [dataset.fetch() for dataset in datasets.items]

        context['can_edit'] = DataserviceEditPermission(self.dataservice)
        return context


@blueprint.route('/publishing-form/', endpoint='publishing-form')
class DataservicePublishingFormView(LoginOnlyView):
    template_name = 'dataservice/publishing-form.html'


@sitemap.register_generator
def sitemap_urls():
    for dataservice in Dataservice.objects.visible().only('id', 'slug'):
        yield ('dataservices.show_redirect', {'dataservice': dataservice},
               None, 'weekly', 0.8)
