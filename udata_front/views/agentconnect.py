from datetime import datetime

from flask import abort, url_for, redirect
from udata.i18n import I18nBlueprint
from udata_front.frontend import oauth
from udata.models import datastore
from udata.auth import login_user


blueprint = I18nBlueprint('agentconnect', __name__, url_prefix='/agentconnect')


@blueprint.route('/login', endpoint='login')
def login():
    client = oauth.create_client('agentconnect')
    if not client:
        abort(404)

    redirect_uri = url_for('agentconnect.auth', _external=True)
    return client.authorize_redirect(redirect_uri)


@blueprint.route('/auth', endpoint='auth')
def auth():
    client = oauth.create_client('agentconnect')
    if not client:
        abort(404)

    token = client.authorize_access_token()
    agentconnect_user = token.get('userinfo')
    if not agentconnect_user:
        agentconnect_user = client.userinfo()
    user = datastore.find_user(email=agentconnect_user['email'])
    if not user:
        user = datastore.create_user(
            email=agentconnect_user['email'],
            first_name=agentconnect_user.get('given_name'),
            last_name=agentconnect_user.get('family_name'),
            confirmed_at=datetime.now()
            )

    if not login_user(user):
        return {'message': 'AgentConnect Authentication failed'}, 401

    return redirect('/')
