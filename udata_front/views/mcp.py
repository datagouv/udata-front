from flask import abort, request, url_for, make_response
from udata.i18n import I18nBlueprint
from udata_front.frontend import oauth

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
    print(token)
    user = token.get('userinfo')
    if not user:
        user = client.userinfo()

    breakpoint()

    session['user'] = user
    return redirect('/')
