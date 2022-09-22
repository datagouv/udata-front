from typing import List
from udata_front.forms import ExtendedRegisterForm;
from udata_front.tests import GouvFrSettings
from udata_front.tests.frontend import GouvfrFrontTestCase

import pytest

class ExtendedRegisterFormTest(GouvfrFrontTestCase):
    settings = GouvFrSettings
    modules: List[str] = []
    url = "https://example.com/validation-captchetat"
    oauth_url = "https://example.com/oauth"

    @pytest.fixture(autouse=True)
    def setup(self, rmock):
        self.rmock = rmock

    def test_register_form_required_fields(self):
        form = ExtendedRegisterForm.from_json({
            'email': 'a@a.fr',
            'password': 'passpass',
            'password_confirm': 'passpass',
        })
        result = form.validate()
        assert result == False
        assert 'first_name' in form.errors
        assert 'last_name' in form.errors
        assert 'captcha_code' in form.errors
        assert 'captcha_id' in form.errors

    def test_register_form_accepts_no_url(self):
        form = ExtendedRegisterForm.from_json({
            'email': 'a@a.fr',
            'password': 'passpass',
            'password_confirm': 'passpass',
            'first_name': 'azeaezr http://dumdum.fr',
            'last_name': 'azeaze https://etalab.studio',
        })
        result = form.validate()
        assert result == False
        assert 'first_name' in form.errors
        assert 'last_name' in form.errors


    @pytest.mark.options(CAPTCHETAT_OAUTH_TOKEN_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_VALIDATION_URL=url)
    def test_register_form_invalid_captcha(self):
        '''It should return False with an invalid captcha.'''
        self.rmock.post(self.oauth_url, json={"access_token": "some_token", "expires_in": 3600})
        self.rmock.post(self.url, text="false")
        form = ExtendedRegisterForm.from_json({
            'email': 'a@a.fr',
            'first_name': 'first',
            'last_name': 'last',
            'password': 'passpass12A',
            'password_confirm': 'passpass12A',
            'captcha_id': '1230',
            'captcha_code': 'azerty'
        })
        result = form.validate()
        assert result == False
        assert 'captcha_code' in form.errors

    @pytest.mark.options(CAPTCHETAT_OAUTH_TOKEN_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_VALIDATION_URL=url)
    def test_register_form_validated(self):
        '''It should return False with an invalid captcha.'''
        self.rmock.post(self.oauth_url, json={"access_token": "some_token", "expires_in": 3600})
        self.rmock.post(self.url, text="true")
        form = ExtendedRegisterForm.from_json({
            'email': 'a@a.fr',
            'first_name': 'first',
            'last_name': 'last',
            'password': 'passpass12A',
            'password_confirm': 'passpass12A',
            'captcha_id': '1230',
            'captcha_code': 'azerty'
        })
        result = form.validate()
        assert result == True
