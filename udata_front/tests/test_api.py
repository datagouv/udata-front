from flask import url_for
from typing import List
from udata_front.tests import GouvFrSettings
from udata.tests import WebTestMixin

import logging
import pytest

log = logging.getLogger(__name__)


class ApiTest(WebTestMixin):
    settings = GouvFrSettings
    modules: List[str] = []
    styles = ["captchaFR", "captchaEN"]
    captcha_id = "0d9285701cae44279ea2c8893ddd4eaf"
    url = "https://example.com/captchetat"
    oauth_url = "https://example.com/oauth"

    def oauth_token_url(self):
        return self.oauth_url + "/api/oauth/token"

    def captchetat_url(self):
        return self.url + "/simple-captcha-endpoint"

    @pytest.mark.options(CAPTCHETAT_OAUTH_BASE_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_BASE_URL=url)
    @pytest.mark.parametrize("style", styles)
    def test_capchetat_fail_with_oauth_error(self, rmock, style):
        '''It should failed if there is an oauth error.'''
        rmock.post(self.oauth_token_url(), status_code=500)
        response = self.get(url_for('apiv2.captchetat', get='html', c=style))
        self.assert500(response)

    @pytest.mark.options(CAPTCHETAT_OAUTH_BASE_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_BASE_URL=url)
    @pytest.mark.parametrize("style", styles)
    def test_capchetat_fail_without_access_token_during_oauth(self, rmock, style):
        '''It should failed if there is no access_token in oauth response.'''
        rmock.post(self.oauth_token_url(), json={})
        response = self.get(url_for('apiv2.captchetat', get='html', c=style))
        self.assert500(response)

    @pytest.mark.options(CAPTCHETAT_OAUTH_BASE_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_BASE_URL=url)
    @pytest.mark.parametrize("style", styles)
    def test_capchetat_get_html(self, rmock, style):
        '''It should return HTML from the service.'''
        rmock.post(self.oauth_token_url(), json={"access_token": "some_token", "expires_in": 3600})
        rmock.get(
            self.captchetat_url() + "?get=html&c=" + style,
            text=f"some HTML with {style} and {self.captcha_id}"
        )
        response = self.get(url_for('apiv2.captchetat', get='html', c=style))
        self.assert200(response)
        snippet = response.data.decode('utf8')
        assert style in snippet
        assert self.captcha_id in snippet

    @pytest.mark.options(CAPTCHETAT_OAUTH_BASE_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_BASE_URL=url)
    @pytest.mark.parametrize("style", styles)
    def test_capchetat_get_image(self, rmock, style):
        '''It should return image from the service.'''
        rmock.post(self.oauth_token_url(), json={"access_token": "some_token", "expires_in": 3600})
        content = bytes("some string", 'UTF-8')
        rmock.get(f"{self.captchetat_url()}?get=image&c={style}&t={self.captcha_id}",
                  content=content)
        response = self.get(url_for('apiv2.captchetat', get='image', c=style, t=self.captcha_id))
        self.assert200(response)
        assert content in bytes(response.data)

    @pytest.mark.options(CAPTCHETAT_OAUTH_BASE_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_BASE_URL=url)
    @pytest.mark.parametrize("style", styles)
    def test_capchetat_get_sound(self, rmock, style):
        '''It should return sound from the service.'''
        rmock.post(self.oauth_token_url(), json={"access_token": "some_token", "expires_in": 3600})
        content = bytes(10)
        rmock.get(f"{self.captchetat_url()}?get=sound&c={style}&t={self.captcha_id}",
                  content=content)
        response = self.get(
            url_for('apiv2.captchetat', get='sound', c=style, t=self.captcha_id),
            content_type="audio/*"
        )
        self.assert200(response)
        assert response.content_type == "audio/*"

    @pytest.mark.options(CAPTCHETAT_OAUTH_BASE_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_BASE_URL=url)
    @pytest.mark.parametrize("style", styles)
    def test_capchetat_get_additional_data(self, rmock, style):
        '''It should return json additional data from the service.'''
        rmock.post(self.oauth_token_url(), json={"access_token": "some_token", "expires_in": 3600})
        json = {"hs": "some_id", "sp": "another_id"}
        rmock.get(f"{self.captchetat_url()}?get=p&c={style}&t={self.captcha_id}", json=json)
        response = self.get(url_for('apiv2.captchetat', get='p', c=style, t=self.captcha_id))
        self.assert200(response)
        assert response.content_type == "application/json"
        snippet = response.json
        assert json == snippet

    @pytest.mark.options(CAPTCHETAT_OAUTH_BASE_URL=oauth_url)
    @pytest.mark.options(CAPTCHETAT_BASE_URL=url)
    @pytest.mark.parametrize("style", styles)
    def test_capchetat_get_script_include(self, rmock, style):
        '''It should return script from the service.'''
        rmock.post(self.oauth_token_url(), json={"access_token": "some_token", "expires_in": 3600})
        rmock.get(
            self.captchetat_url() + "?get=script-include&c=" + style,
            text=f"some script with {style} and {self.captcha_id}"
        )
        response = self.get(url_for('apiv2.captchetat', get='script-include', c=style))
        self.assert200(response)
        snippet = response.data.decode('utf8')
        assert style in snippet
        assert self.captcha_id in snippet
