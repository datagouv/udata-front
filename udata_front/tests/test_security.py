from flask import url_for
from typing import List
from udata_front.tests import GouvFrSettings
from udata.tests import WebTestMixin

import pytest


class SecurityTest(WebTestMixin):
    '''Ensure themed views render'''
    settings = GouvFrSettings
    modules: List[str] = []

    @pytest.mark.options(CAPTCHETAT_BASE_URL=None)
    def test_render_register_without_captchetat(self, client):
        '''It should render the register page without captchetat'''

        response = client.get(url_for('security.register'))
        self.assert200(response)

    @pytest.mark.options(CAPTCHETAT_BASE_URL='https://www.example.com/')
    def test_render_register_with_captchetat(self, client):
        '''It should render the register page with captchetat'''

        response = client.get(url_for('security.register'))
        self.assert200(response)
