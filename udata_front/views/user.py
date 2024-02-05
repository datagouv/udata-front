import logging

from flask import url_for, redirect, abort, g
from flask_security import current_user

from udata_front.views.base import DetailView
from udata.core.user.permissions import sysadmin, UserEditPermission
from udata.i18n import I18nBlueprint
from udata.models import User, Organization, Dataset, Reuse, Follow


blueprint = I18nBlueprint('users', __name__, url_prefix='/users')

log = logging.getLogger(__name__)


@blueprint.before_app_request
def set_g_sysadmin():
    g.sysadmin = sysadmin


@blueprint.app_context_processor
def inject_sysadmin_perms():
    return {'sysadmin': sysadmin}


class UserView(object):
    model = User
    object_name = 'user'

    @property
    def user(self):
        return self.get_object()

    def get_context(self):
        context = super(UserView, self).get_context()
        context['organizations'] = Organization.objects(
            members__user=self.user)
        return context


@blueprint.route('/<user:user>/', endpoint='show')
class UserDetailView(UserView, DetailView):
    template_name = 'user/base.html'

    def get_context(self):
        if current_user.is_anonymous or not current_user.sysadmin:
            if not self.user.active:
                abort(410, 'User is not active')
        context = super(UserDetailView, self).get_context()
        context['can_edit'] = UserEditPermission(self.user)

        return context


@blueprint.route('/<user:user>/datasets/', endpoint='datasets')
def redirect_datasets(user):
    return redirect(url_for('users.show', user=user))


@blueprint.route('/<user:user>/reuses/', endpoint='reuses')
def redirect_reuses(user):
    return redirect(url_for('users.show', user=user))


@blueprint.route('/<user:user>/following/', endpoint='following')
class UserFollowingView(UserView, DetailView):
    template_name = 'user/following.html'

    def get_context(self):
        context = super(UserFollowingView, self).get_context()
        context['can_edit'] = UserEditPermission(self.user)
        datasets, reuses, organizations, users = [], [], [], []

        for follow in Follow.objects.following(self.user).select_related():
            if isinstance(follow.following, Organization):
                organizations.append(follow.following)
            elif isinstance(follow.following, Reuse):
                reuses.append(follow.following)
            elif isinstance(follow.following, Dataset):
                datasets.append(follow.following)
            elif isinstance(follow.following, User):
                users.append(follow.following)
            else:
                log.warning(
                    'Follow object %s has not dereferenced %s',
                    follow.id, follow.following)

        context.update({
            'followed_datasets': sorted(datasets, key=lambda d: d.title),
            'followed_reuses': sorted(reuses, key=lambda r: r.title),
            'followed_organizations': sorted(organizations,
                                             key=lambda o: o.name),
            'followed_users': sorted(users, key=lambda u: u.fullname),
        })

        return context


@blueprint.route('/<user:user>/followers/', endpoint='followers')
class UserFollowersView(UserView, DetailView):
    template_name = 'user/followers.html'

    def get_context(self):
        context = super(UserFollowersView, self).get_context()
        context['can_edit'] = UserEditPermission(self.user)
        context['followers'] = (Follow.objects.followers(self.user)
                                              .order_by('follower.fullname'))
        return context
