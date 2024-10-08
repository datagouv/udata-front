from datetime import datetime
from werkzeug.security import gen_salt
from authlib.common.urls import add_params_to_uri

from flask import abort, redirect, url_for, session, request
from udata.i18n import I18nBlueprint
from udata_front.frontend import oauth
from udata.models import datastore
from udata.auth import login_user


blueprint = I18nBlueprint('proconnect', __name__, url_prefix='/proconnect')
STATE_KEY = "proconnect_state"
ID_TOKEN_KEY = "id_token"


@blueprint.route('/login', endpoint='login')
def login():
    redirect_uri = url_for('proconnect.auth', _external=True)
    return oauth.proconnect.authorize_redirect(redirect_uri, acr_values='eidas1')


@blueprint.route('/auth', endpoint='auth')
def auth():
    token = oauth.proconnect.authorize_access_token()
    # Store the user info in the session, it'll be used when logging out from ProConnect.
    session[ID_TOKEN_KEY] = token[ID_TOKEN_KEY]
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
    userinfo_token[ID_TOKEN_KEY] = resp.content
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


@blueprint.route('/logout_oauth', endpoint='logout_oauth')
def logout():
    # At the time of this writing, authlib didn't implement OpenIDC session management:
    # https://github.com/lepture/authlib/issues/292
    # So we implement it ourselves. This code may be simplified (or even removed?) in the future
    # if we update to a version that supports it.
    metadata = oauth.proconnect.load_server_metadata()
    end_session_endpoint = metadata["end_session_endpoint"]
    # Generate a random state that we send to ProConnect, they'll return it so we can check it.
    state = gen_salt(50)
    session[STATE_KEY] = state
    redirect_uri = url_for('proconnect.logout', _external=True)

    id_token = session.get(ID_TOKEN_KEY)
    if id_token is None:
        # No id_token, so no way to logout from ProConnect.
        return redirect(url_for("security.logout"))

    end_session_url = add_params_to_uri(end_session_endpoint, (
        ('id_token_hint', id_token),
        ('state', state),
        ('post_logout_redirect_uri', redirect_uri),
    ))

    return redirect(end_session_url)


@blueprint.route('/logout', endpoint='logout')
def oauth_logged_out():
    # Double check that the request hasn't been forged by checking the random "state" we provided.
    state = request.args["state"]
    stored_state = session.get(STATE_KEY)
    if state != stored_state:
        abort(401)

    # We're logged out from ProConnect, cleanup the ProConnect related data from the session.
    session.pop(ID_TOKEN_KEY, None)
    session.pop(STATE_KEY, None)

    return redirect(url_for("security.logout"))
