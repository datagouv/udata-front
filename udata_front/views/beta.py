from udata.i18n import I18nBlueprint
from udata_front.views.base import LoginOnlyView

blueprint = I18nBlueprint('beta', __name__, url_prefix='/beta/admin')


# This is a temporary file and route to keep the existing admin in place
# and allowing users with the link to view the new admin
@blueprint.route('/', endpoint='beta-admin')
class AdminView(LoginOnlyView):
    template_name = 'beta/admin.html'


@blueprint.route(
    '/organizations/<organization_id>/dataservices/<dataservice_id>',
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


@blueprint.route('/me/dataservices/<dataservice_id>', endpoint='beta-admin-me-dataservice')
class AdminViewMeDataservice(LoginOnlyView):
    template_name = 'beta/admin.html'

    def get_context(self, **kwargs):
        context = super().get_context(**kwargs)
        # Extract parameters from kwargs
        context['organization_id'] = kwargs.get('organization_id')
        context['dataservice_id'] = kwargs.get('dataservice_id')
        return context


@blueprint.route('/dataservices/new/', endpoint='dataservices-new')
class DataservicePublishingFormView(LoginOnlyView):
    template_name = 'dataservice/publishing-form.html'


@blueprint.route('/datasets/new/', endpoint='datasets-new')
class PublishingFormView(LoginOnlyView):
    template_name = 'dataset/publishing-form.html'


@blueprint.route('/organizations/new', endpoint='organizations-new')
class OrganizationPublishingFormView(LoginOnlyView):
    template_name = 'organization/publishing-form.html'


@blueprint.route('/reuses/new/', endpoint='reuses-new')
class ReusePublishingFormView(LoginOnlyView):
    template_name = 'reuse/publishing-form.html'
