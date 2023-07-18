from datetime import datetime

from flask import abort, url_for, redirect
from udata.i18n import I18nBlueprint
from udata_front.frontend import oauth
from udata.models import datastore
from udata.auth import login_user


blueprint = I18nBlueprint('mcp', __name__, url_prefix='/mcp')


@blueprint.route('/login', endpoint='login')
def login():
    client = oauth.create_client('mcp')
    if not client:
        abort(404)

    redirect_uri = url_for('mcp.auth', _external=True)
    return client.authorize_redirect(redirect_uri)


@blueprint.route('/auth', endpoint='auth')
def auth():
    client = oauth.create_client('mcp')
    if not client:
        abort(404)

    token = client.authorize_access_token()
    mcp_user = token.get('userinfo')
    if not mcp_user:
        mcp_user = client.userinfo()
    user = datastore.find_user(email=mcp_user['email'])
    if not user:
        user = datastore.create_user(
            email=mcp_user['email'],
            first_name=mcp_user.get('given_name'),
            last_name=mcp_user.get('family_name'),
            confirmed_at=datetime.now()
            )

    if not login_user(user):
        return {'message': 'MonComptePro Authentication failed'}, 401

    return redirect('/')
