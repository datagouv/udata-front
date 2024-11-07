from udata.i18n import I18nBlueprint
from udata_front.views.base import LoginOnlyView

blueprint = I18nBlueprint('beta', __name__, url_prefix='/beta/admin')

# This is a temporary file and route to keep the existing admin in place
# and allowing users with the link to view the new admin
@blueprint.route('/', endpoint='beta-admin')
class AdminView(LoginOnlyView):
    template_name = 'beta/admin.html'


@blueprint.route('/dataservices/new/', endpoint='dataservices-new')
class DataservicePublishingFormView(LoginOnlyView):
    template_name = 'dataservice/publishing-form.html'


@blueprint.route('/datasets/new/', endpoint='datasets-new')
class PublishingFormView(LoginOnlyView):
    template_name = 'dataset/publishing-form.html'


@blueprint.route('/reuses/new/', endpoint='reuses-new')
class ReusePublishingFormView(LoginOnlyView):
    template_name = 'reuse/publishing-form.html'
