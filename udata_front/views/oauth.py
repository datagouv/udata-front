from authlib.integrations.flask_oauth2 import AuthorizationServer
from authlib.oauth2 import OAuth2Error
from flask import request

from udata.auth import current_user, login_required
from udata.i18n import I18nBlueprint

from udata_front import theme


blueprint = I18nBlueprint('oauth_udata_front', __name__, url_prefix='/oauth')
oauth = AuthorizationServer()


@blueprint.route('/authorize', methods=['GET'])
@login_required
def authorize(*args, **kwargs):
    '''Override /authorize GET route to render udata-front template'''
    if request.method == 'GET':
        try:
            grant = oauth.validate_consent_request(end_user=current_user)
        except OAuth2Error as error:
            return error.error
        # Bypass authorization screen for internal clients
        if grant.client.internal:
            return oauth.create_authorization_response(grant_user=current_user)
        return theme.render('api/oauth_authorize.html', grant=grant)
    elif request.method == 'POST':
        accept = 'accept' in request.form
        decline = 'decline' in request.form
        if accept and not decline:
            grant_user = current_user
        else:
            grant_user = None
        return oauth.create_authorization_response(grant_user=grant_user)
