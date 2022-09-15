import requests

from flask import current_app
from udata.auth.forms import ExtendedRegisterForm
from udata.forms import fields
from udata.forms import validators
from udata.i18n import lazy_gettext as _
from udata_front.api import bearer_token


class ExtendedAgainRegisterForm(ExtendedRegisterForm):

    captcha_code = fields.StringField(
        _('captcha_input'), [validators.DataRequired()])

    captcha_id = fields.StringField(
        _('captcha_id'), [validators.DataRequired()])

    def validate(self):
        # no register allowed when read only mode is on
        if not super().validate() or current_app.config.get('READ_ONLY_MODE'):
            return False

        headers = {'Authorization': 'Bearer ' + bearer_token()}
        captchetat_url = current_app.config.get('CAPTCHETAT_VALIDATION_URL')
        try:
            resp = requests.post(captchetat_url, headers=headers, json={
                'id': self.captcha_id.data,
                'code': self.captcha_code.data
            })
            if resp.text == 'true':
                return True
            self.captcha_code.process_errors.append(_('Invalid Captcha'))
            return False
        except requests.exceptions.RequestException:
            return False
