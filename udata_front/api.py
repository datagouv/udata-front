from flask import current_app

import requests

from udata.api import apiv2, API

ns = apiv2.namespace('captchetat', 'CaptchEtat related operations')
captchetat_parser = apiv2.parser()
captchetat_parser.add_argument('get', type=str, location='args')
captchetat_parser.add_argument('c', type=str, location='args')
captchetat_parser.add_argument('d', type=str, location='args')
captchetat_parser.add_argument('t', type=str, location='args')
captchetat_parser.add_argument('cs', type=str, location='args')
@ns.route('/', endpoint='captchetat')
class CaptchEtatAPI(API):
    @property
    def bearer_token(self):
        oauth = requests.post(current_app.config.get('CAPTCHETAT_OAUTH_BASE_URL'), params={
            'grant_type': 'client_credentials',
            'scope': 'WRITE',
            'client_id': current_app.config.get('CAPTCHETAT_CLIENT_ID'),
            'client_secret': current_app.config.get('CAPTCHETAT_CLIENT_SECRET')
        })
        return self.source.config

    @apiv2.expect(captchetat_parser)
    @apiv2.doc('captchetat')
    def get(self):
        '''CaptchEtat endpoint for captcha generation and validation'''
        args = captchetat_parser.parse_args()
        headers = {}
        captchetat_url = current_app.config.get('CAPTCHETAT_BASE_URL')
        req = requests.get(captchetat_url, headers=headers, params=args)
        return req.status_code