from datetime import datetime

from flask import abort, current_app, redirect, url_for
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
    if current_app.config.get('AGENTCONNECT_REDIRECT_URL'):
        redirect_uri = current_app.config.get('AGENTCONNECT_REDIRECT_URL')
    return client.authorize_redirect(redirect_uri, acr_values='eidas1')


@blueprint.route('/auth', endpoint='auth')
def auth():
    client = oauth.create_client('agentconnect')
    if not client:
        abort(404)

    token = client.authorize_access_token()
    # /!\ DIRTY HACK.
    # authlib expects the userinfo to either be in the token["id_token"] as a jwt...
    # but in this case, it's not there, it's some other information.
    # We thus need to go get the userinfo from the userinfo_endpoint, but authlib
    # expects it to be plain json. However, agentconnect returns a jwt.
    # So we can't use authlib's client.userinfo() helper, we need to do it ourselves.
    metadata = client.load_server_metadata()
    resp = client.get(metadata["userinfo_endpoint"])
    resp.raise_for_status()
    # Create a new token that `client.parse_id_token` expects. Replace the initial
    # `id_token` with the jwt we received from the `userinfo_endpoint`.
    userinfo_token = token.copy()
    userinfo_token["id_token"] = resp.content
    agentconnect_user = client.parse_id_token(userinfo_token, nonce=None)
    # We now have the user information decoded from the jwt, ready to be used.
    user = datastore.find_user(email=agentconnect_user["email"])
    if not user:
        user = datastore.create_user(
            email=agentconnect_user['email'],
            first_name=agentconnect_user.get('given_name'),
            last_name=agentconnect_user.get('usual_name'),
            confirmed_at=datetime.now()
            )

    if not login_user(user):
        return {'message': 'AgentConnect Authentication failed'}, 401

    return redirect('/')
