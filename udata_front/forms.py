import requests

from flask import current_app
from flask_security.forms import RegisterForm
from udata.forms import fields
from udata.forms import validators
from udata.i18n import lazy_gettext as _
from udata_front.api import bearer_token


class ExtendedRegisterForm(RegisterForm):
    first_name = fields.StringField(
        _('First name'), [validators.DataRequired(_('First name is required')),
                          validators.NoURLs(_('URLs not allowed in this field'))])
    last_name = fields.StringField(
        _('Last name'), [validators.DataRequired(_('Last name is required')),
                         validators.NoURLs(_('URLs not allowed in this field'))])

    captcha_code = fields.StringField(
        _('captcha_input'), [validators.DataRequired()])

    captcha_id = fields.StringField(
        _('captcha_id'), [validators.DataRequired()])

    def validate(self):
        # no register allowed when read only mode is on
        if not super().validate() or current_app.config.get('READ_ONLY_MODE'):
            return False

        headers = {'Authorization': 'Bearer ' + bearer_token()}
        captchetat_url = current_app.config.get('CAPTCHETAT_BASE_URL')
        try:
            resp = requests.post(f'{captchetat_url}/valider-captcha', headers=headers, json={
                'id': self.captcha_id.data,
                'code': self.captcha_code.data
            })
            if resp.text == 'true':
                return True
            self.captcha_code.errors.append(_('Invalid Captcha'))
            return False
        except requests.exceptions.RequestException:
            return False
