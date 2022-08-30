from datetime import datetime, timedelta
from flask import current_app

import requests

from udata.app import cache
from udata.api import apiv2, API, log

ns = apiv2.namespace('captchetat', 'CaptchEtat related operations')
captchetat_parser = apiv2.parser()
captchetat_parser.add_argument('get', type=str, location='args')
captchetat_parser.add_argument('c', type=str, location='args')
captchetat_parser.add_argument('d', type=str, location='args')
captchetat_parser.add_argument('t', type=str, location='args')
captchetat_parser.add_argument('cs', type=str, location='args')
@ns.route('/', endpoint='captchetat')
class CaptchEtatAPI(API):
    
    token_expired_at = None
    cache_key = 'captchetat-bearer-token'

    def check_bearer_expired(self, forced):
        print(self)
        print(datetime.now())
        return self.token_expired_at > datetime.now() if not forced and self.token_expired_at else True

    @cache.cached(key_prefix=cache_key, unless=check_bearer_expired)
    def bearer_token(self):
        url = current_app.config.get('CAPTCHETAT_OAUTH_BASE_URL') + '/api/oauth/token'
        previous_value = cache.get(self.cache_key) or ""
        print(url)
        try: 
            oauth = requests.post(url, data={
                'grant_type': 'client_credentials',
                'scope': 'WRITE',
                'client_id': current_app.config.get('CAPTCHETAT_CLIENT_ID'),
                'client_secret': current_app.config.get('CAPTCHETAT_CLIENT_SECRET')
            })
            body = oauth.json()
            access_token = body.get('access_token', previous_value)
            self.token_expired_at = datetime.now() + timedelta(seconds=body.get('expires_in', 0))
        except requests.exceptions.RequestException as e:
            log.exception(f'Error while getting access token from {url}')
            access_token = previous_value
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
        return req.text