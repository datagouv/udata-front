from flask import current_app, make_response, request
from werkzeug.datastructures import MIMEAccept

import logging
import requests

from udata.app import cache
from udata.api import apiv2, API

log = logging.getLogger(__name__)

ns = apiv2.namespace('captchetat', 'CaptchEtat related operations')
captchetat_parser = apiv2.parser()
captchetat_parser.add_argument('get', type=str, location='args')
captchetat_parser.add_argument('c', type=str, location='args')
captchetat_parser.add_argument('d', type=str, location='args')
captchetat_parser.add_argument('t', type=str, location='args')
captchetat_parser.add_argument('cs', type=str, location='args')
@ns.route('/', endpoint='captchetat')
class CaptchEtatAPI(API):

    token_cache_key = 'captchetat-bearer-token'
    default_mediatype = 'application/octet-stream'

    def bearer_token(self):
        '''Get CaptchEtat bearer token from cache or get a new one from captchEtat Oauth server'''
        url = current_app.config.get('CAPTCHETAT_OAUTH_BASE_URL') + '/api/oauth/token'
        previous_value = cache.get(self.token_cache_key)
        access_token = ""
        if(previous_value):
            return previous_value
        log.info(f'New access token requested from {url}')
        try:
            oauth = requests.post(url, data={
                'grant_type': 'client_credentials',
                'scope': 'WRITE',
                'client_id': current_app.config.get('CAPTCHETAT_CLIENT_ID'),
                'client_secret': current_app.config.get('CAPTCHETAT_CLIENT_SECRET')
            })
            body = oauth.json()
            access_token = body.get('access_token', "")
            cache.set(self.token_cache_key, access_token, timeout=body.get('expires_in', 0))
        except requests.exceptions.RequestException:
            log.exception(f'Error while getting access token from {url}')
        else:
            return access_token

    @apiv2.expect(captchetat_parser)
    @apiv2.doc('captchetat')
    def get(self):
        '''CaptchEtat endpoint for captcha generation and validation'''
        args = captchetat_parser.parse_args()
        headers = {'Authorization': 'Bearer ' + self.bearer_token()}
        captchetat_url = current_app.config.get('CAPTCHETAT_BASE_URL') + "/simple-captcha-endpoint"
        req = requests.get(captchetat_url, headers=headers, params=args)
        if args['get'] == "sound":
            accept = request.accept_mimetypes.copy()
            accept.append(("audio/*", 1))
            request.accept_mimetypes = MIMEAccept(accept)
        return req.content

    @apiv2.representation('image/*')
    @apiv2.representation('audio/*')
    def image(data, code, headers):
        resp = make_response(bytes(data), code)
        resp.headers.extend(headers)
        return resp
