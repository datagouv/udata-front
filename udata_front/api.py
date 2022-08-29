from udata.api import apiv2, API

ns = apiv2.namespace('captchetat', 'CaptchEtat related operations')
captchetat_parser = apiv2.parser()
captchetat_parser.add_argument('get', type=str, location='args')
captchetat_parser.add_argument('c', type=str, location='args')
captchetat_parser.add_argument('i', type=str, location='args')
captchetat_parser.add_argument('t', type=str, location='args')
captchetat_parser.add_argument('cs', type=str, location='args')
@ns.route('/', endpoint='captchetat')
class CaptchEtatAPI(API):
    @apiv2.expect(captchetat_parser)
    @apiv2.doc('captchetat')
    def get(self):
        '''CaptchEtat endpoint for captcha generation and validation'''
        args = captchetat_parser.parse_args()
        return args