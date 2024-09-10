from datetime import datetime

from flask import redirect, url_for
from udata.i18n import I18nBlueprint
from udata_front.frontend import oauth
from udata.models import datastore
from udata.auth import login_user


blueprint = I18nBlueprint('proconnect', __name__, url_prefix='/proconnect')


@blueprint.route('/login', endpoint='login')
def login():
    redirect_uri = url_for('proconnect.auth', _external=True)
    return oauth.proconnect.authorize_redirect(redirect_uri, acr_values='eidas1')


@blueprint.route('/auth', endpoint='auth')
def auth():
    token = oauth.proconnect.authorize_access_token()
    # /!\ DIRTY HACK.
    # authlib expects the userinfo to either be in the token["id_token"] as a jwt...
    # but in this case, it's not there, it's some other information.
    # We thus need to go get the userinfo from the userinfo_endpoint, but authlib
    # expects it to be plain json. However, proconnect returns a jwt.
    # So we can't use authlib's client.userinfo() helper, we need to do it ourselves.
    metadata = oauth.proconnect.load_server_metadata()
    resp = oauth.proconnect.get(metadata["userinfo_endpoint"])
    resp.raise_for_status()
    # Create a new token that `client.parse_id_token` expects. Replace the initial
    # `id_token` with the jwt we received from the `userinfo_endpoint`.
    userinfo_token = token.copy()
    userinfo_token["id_token"] = resp.content
    proconnect_user = oauth.proconnect.parse_id_token(userinfo_token, nonce=None)
    # We now have the user information decoded from the jwt, ready to be used.
    user = datastore.find_user(email=proconnect_user["email"])
    if not user:
        user = datastore.create_user(
            email=proconnect_user['email'],
            first_name=proconnect_user.get('given_name'),
            last_name=proconnect_user.get('usual_name'),
            confirmed_at=datetime.now()
            )

    if not login_user(user):
        return {'message': 'ProConnect Authentication failed'}, 401

    return redirect('/')
