
import pytest

from flask import url_for

from udata.models import Site

from udata.core.dataset.factories import DatasetFactory
from udata.core.organization.factories import OrganizationFactory
from udata.core.site.models import current_site
from udata.core.reuse.factories import ReuseFactory
from udata_front.tests import GouvFrSettings
from udata_front.tests.frontend import GouvfrFrontTestCase


class SiteViewsTest(GouvfrFrontTestCase):
    settings = GouvFrSettings
    modules = ['admin']

    def test_site_global(self):
        '''It should create and/or load the current site'''
        with self.app.test_request_context(''):
            self.app.preprocess_request()
            self.assertIsInstance(current_site._get_current_object(), Site)
            self.assertEqual(current_site.id, self.app.config['SITE_ID'])

    def test_render_home(self):
        '''It should render the home page'''
        for i in range(3):
            org = OrganizationFactory()
            DatasetFactory(organization=org)
            ReuseFactory(organization=org)

        current_site.settings.home_datasets = [
            DatasetFactory() for _ in range(3)]
        current_site.settings.home_reuses = [
            ReuseFactory() for _ in range(3)]

        response = self.get(url_for('site.home'))
        self.assert200(response)

    def test_render_home_no_data(self):
        '''It should render the home page without data'''
        response = self.get(url_for('site.home'))
        self.assert200(response)

    @pytest.mark.options(BANNER_ACTIVATED=False)
    @pytest.mark.options(BANNER_HTML_CONTENT_EN='BANNER_TEST')
    def test_render_home_no_banner(self):
        '''It should render the home page without banner'''
        response = self.get(url_for('site.home'))
        self.assert200(response)
        self.assertNotIn(b"BANNER_TEST", response.data)

    @pytest.mark.options(BANNER_ACTIVATED=True)
    @pytest.mark.options(BANNER_HTML_CONTENT_EN='BANNER_TEST_EN')
    @pytest.mark.options(BANNER_HTML_CONTENT_FR='BANNER_TEST_FR')
    def test_render_home_with_banner(self):
        '''It should render the home page with a banner'''
        response = self.get(url_for('site.home', lang_code='en'))
        self.assert200(response)
        self.assertIn(b"BANNER_TEST_EN", response.data)

        response = self.get(url_for('site.home', lang_code='fr'))
        self.assert200(response)
        self.assertIn(b"BANNER_TEST_FR", response.data)

    def test_render_dashboard(self):
        '''It should render the search page'''
        for i in range(3):
            org = OrganizationFactory()
            DatasetFactory(organization=org)
            ReuseFactory(organization=org)
        response = self.get(url_for('site.dashboard'))
        self.assert200(response)

    def test_render_dashboard_no_data(self):
        '''It should render the search page without data'''
        response = self.get(url_for('site.dashboard'))
        self.assert200(response)

    def test_terms_view(self):
        response = self.client.get(url_for('site.terms'))
        self.assert200(response)
