from flask import abort, request, url_for, make_response
from feedgenerator.django.utils.feedgenerator import Atom1Feed

from udata_front.views.base import SearchView, DetailView, LoginOnlyView
from udata.i18n import I18nBlueprint, gettext as _
from udata.models import Follow
from udata.sitemap import sitemap
from udata_front.frontend import nav
from udata_front.theme import render as render_template

from udata.core.reuse.models import Reuse
from udata.core.reuse.permissions import ReuseEditPermission
from udata.core.reuse.search import ReuseSearch

blueprint = I18nBlueprint('reuses', __name__, url_prefix='/reuses')


@blueprint.route('/recent.atom')
def recent_feed():
    feed = Atom1Feed(_('Last reuses'), description=None,
                     feed_url=request.url, link=request.url_root)
    reuses = Reuse.objects.visible().order_by('-created_at').limit(15)
    for reuse in reuses:
        author_name = None
        author_uri = None
        if reuse.organization:
            author_name = reuse.organization.name
            author_uri = url_for('organizations.show',
                                 org=reuse.organization.id, _external=True)
        elif reuse.owner:
            author_name = reuse.owner.fullname
            author_uri = url_for('users.show',
                                 user=reuse.owner.id, _external=True)
        feed.add_item(reuse.title,
                      description=reuse.description,
                      content=render_template('reuse/feed_item.html', reuse=reuse),
                      author_name=author_name,
                      author_link=author_uri,
                      link=url_for('reuses.show', reuse=reuse.id, _external=True),
                      updateddate=reuse.last_modified,
                      pubdate=reuse.created_at)
    response = make_response(feed.writeString('utf-8'))
    response.headers['Content-Type'] = 'application/atom+xml'
    return response


@blueprint.route('/', endpoint='list')
class ReuseListView(SearchView):
    model = Reuse
    context_name = 'reuses'
    template_name = 'reuse/list.html'
    search_adapter = ReuseSearch
    page_size = 21


navbar = nav.Bar('edit_reuse', [
    nav.Item(_('Transfer'), 'reuses.transfer'),
])


class ReuseView(object):
    model = Reuse
    object_name = 'reuse'

    @property
    def reuse(self):
        return self.get_object()

    def get_context(self):
        for item in navbar:
            item._args = {'reuse': self.reuse}
        return super(ReuseView, self).get_context()


class ProtectedReuseView(ReuseView):
    def can(self, *args, **kwargs):
        permission = ReuseEditPermission(self.reuse)
        return permission.can()


@blueprint.route('/<reuse:reuse>/', endpoint='show')
class ReuseDetailView(ReuseView, DetailView):
    template_name = 'reuse/display.html'

    def get_context(self):
        context = super(ReuseDetailView, self).get_context()

        if self.reuse.private and not ReuseEditPermission(self.reuse).can():
            abort(404)

        if self.reuse.deleted and not ReuseEditPermission(self.reuse).can():
            abort(410)

        followers = (Follow.objects.followers(self.reuse)
                     .order_by('follower.fullname'))

        related_reuses = Reuse.objects(id__ne=self.reuse.id)
        if self.reuse.organization:
            related_reuses = related_reuses.owned_by(self.reuse.organization.id)
        elif self.reuse.owner:
            related_reuses = related_reuses.owned_by(self.reuse.owner.id)
        related_reuses = related_reuses.visible().order_by('-created_at').limit(4)

        context.update(
            followers=followers,
            related_reuses=related_reuses,
            can_edit=ReuseEditPermission(self.reuse)
        )

        return context


@blueprint.route('/publishing-form/', endpoint='publishing-form')
class ReusePublishingFormView(LoginOnlyView):
    template_name = 'reuse/publishing-form.html'


@sitemap.register_generator
def sitemap_urls():
    for reuse in Reuse.objects.visible().only('id', 'slug'):
        yield 'reuses.show_redirect', {'reuse': reuse}, None, 'weekly', 0.8
