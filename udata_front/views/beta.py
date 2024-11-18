from udata.i18n import I18nBlueprint
from udata_front.views.base import LoginOnlyView

blueprint = I18nBlueprint('beta', __name__, url_prefix='/beta')


# This is a temporary file and route to keep the existing admin in place
# and allowing users with the link to view the new admin
@blueprint.route('/admin/', endpoint='beta-admin')
class AdminView(LoginOnlyView):
    template_name = 'beta/admin.html'


@blueprint.route(
    '/admin/organizations/<organization_id>/dataservices/<dataservice_id>',
    endpoint='beta-admin-org-dataservice'
)
class AdminViewOrgDataservice(LoginOnlyView):
    template_name = 'beta/admin.html'

    def get_context(self, **kwargs):
        context = super().get_context(**kwargs)
        # Extract parameters from kwargs
        context['organization_id'] = kwargs.get('organization_id')
        context['dataservice_id'] = kwargs.get('dataservice_id')
        return context


@blueprint.route('/admin/me/dataservices/<dataservice_id>', endpoint='beta-admin-me-dataservice')
class AdminViewMeDataservice(LoginOnlyView):
    template_name = 'beta/admin.html'

    def get_context(self, **kwargs):
        context = super().get_context(**kwargs)
        # Extract parameters from kwargs
        context['organization_id'] = kwargs.get('organization_id')
        context['dataservice_id'] = kwargs.get('dataservice_id')
        return context
