import requests

from flask import current_app
from flask_security.forms import RegisterForm, ForgotPasswordForm
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

    captcha_code = fields.StringField(_('captcha_input'), [])

    captchetat_uuid = fields.StringField(
        _('captchetat_uuid'), name='captchetat-uuid', validators=[]
    )

    def validate(self, **kwargs):
        if current_app.config.get('READ_ONLY_MODE'):
            return False

        if not check_captchetat(self.captchetat_uuid.data, self.captcha_code.data):
            self.captcha_code.errors = [_('Invalid Captcha')]
            return False

        return super().validate(**kwargs)


class ExtendedForgotPasswordForm(ForgotPasswordForm):
    captcha_code = fields.StringField(_('captcha_input'), [])

    captchetat_uuid = fields.StringField(
        _('captchetat_uuid'), name='captchetat-uuid', validators=[]
    )

    def validate(self, **kwargs):
        if not check_captchetat(self.captchetat_uuid.data, self.captcha_code.data):
            self.captcha_code.errors = [_('Invalid Captcha')]
            return False

        return super().validate(**kwargs)


def check_captchetat(id: str, code: str) -> bool:
    captchetat_url = current_app.config.get('CAPTCHETAT_BASE_URL')
    if not captchetat_url:
        return True

    if not id or not code:
        return False

    headers = {'Authorization': 'Bearer ' + bearer_token()}
    try:
        resp = requests.post(f'{captchetat_url}/valider-captcha', headers=headers, json={
            'uuid': id,
            'code': code,
        })
        return resp.text == 'true'
    except requests.exceptions.RequestException:
        # Should not happen, log?
        return False
