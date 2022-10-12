from flask import current_app, json, make_response, request
from werkzeug.datastructures import MIMEAccept

import logging
import requests

from udata.app import cache
from udata.api import apiv2, API

log = logging.getLogger(__name__)

ns = apiv2.namespace('captchetat', 'CaptchEtat related operations')
captchetat_parser = apiv2.parser()
captchetat_parser.add_argument('get', type=str, location='args', help='type of data wanted from captchetat')
captchetat_parser.add_argument('c', type=str, location='args', help='captcha name')
captchetat_parser.add_argument('d', type=str, location='args', help='this is a technical argument auto-generated for audio content')
captchetat_parser.add_argument('t', type=str, location='args', help='captcha id, this is a technical argument auto-generated')
captchetat_parser.add_argument('cs', type=str, location='args', help='captcha style code, this is a technical argument auto-generated')


def bearer_token():
    '''Get CaptchEtat bearer token from cache or get a new one from CaptchEtat Oauth server'''
    token_cache_key = current_app.config.get('CAPTCHETAT_TOKEN_CACHE_KEY')
    url = current_app.config.get('CAPTCHETAT_OAUTH_TOKEN_URL')
    previous_value = cache.get(token_cache_key)
    if previous_value:
        return previous_value
    log.debug(f'New access token requested from {url}')
    try:
        oauth = requests.post(url, data={
            'grant_type': 'client_credentials',
            'scope': 'WRITE',
            'client_id': current_app.config.get('CAPTCHETAT_CLIENT_ID'),
            'client_secret': current_app.config.get('CAPTCHETAT_CLIENT_SECRET')
        })
        body = oauth.json()
        access_token = body.get('access_token', "")
        cache.set(token_cache_key, access_token, timeout=body.get('expires_in', 0))
    except requests.exceptions.RequestException:
        log.exception(f'Error while getting access token from {url}')
    else:
        return access_token


@ns.route('/', endpoint='captchetat')
class CaptchEtatAPI(API):
    @apiv2.expect(captchetat_parser)
    @apiv2.doc('captchetat')
    def get(self):
        '''CaptchEtat endpoint for captcha generation and validation'''
        args = captchetat_parser.parse_args()
        headers = {'Authorization': 'Bearer ' + bearer_token()}
        captchetat_url = current_app.config.get('CAPTCHETAT_GET_CAPTCHA_URL')
        req = requests.get(captchetat_url, headers=headers, params=args)
        accept = request.accept_mimetypes.copy()
        if args['get'] == "sound":
            accept.append(("audio/*", 1))
        if args['get'] == "p":
            return json.loads(req.content)
        request.accept_mimetypes = MIMEAccept(accept)
        return req.content

    @apiv2.representation('image/*')
    @apiv2.representation('audio/*')
    def media(data, code, headers):
        resp = make_response(bytes(data), code)
        resp.headers.extend(headers)
        return resp
