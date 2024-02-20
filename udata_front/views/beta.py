from udata.i18n import I18nBlueprint
from udata_front.views.base import LoginOnlyView

blueprint = I18nBlueprint('beta', __name__, url_prefix='/beta')

# This is a temporary file and route to keep the existing admin in place
# and allowing users with the link to view the new admin
@blueprint.route('/admin/', endpoint='beta-admin')
class AdminView(LoginOnlyView):
    template_name = 'beta/admin.html'
