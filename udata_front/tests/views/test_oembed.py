import copy
import pytest

from flask import url_for

from udata_front import theme
from udata.core.dataset.factories import DatasetFactory
from udata.core.reuse.factories import ReuseFactory
from udata.core.user.factories import UserFactory
from udata.core.organization.factories import OrganizationFactory
from udata.features.territories.models import TERRITORY_DATASETS

from udata.settings import Testing
from udata.tests.helpers import assert200, assert400, assert404, assert_status, assert_cors
from udata.frontend.markdown import mdstrip

from udata_front.tests import GouvFrSettings


class OEmbedAPITest:
    settings = GouvFrSettings
    modules = []

    def test_oembed_for_dataset(self, api):
        '''It should fetch a dataset in the oembed format.'''
        dataset = DatasetFactory()

        url = url_for('api.oembed', url=dataset.url_for())

        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert200(response)
        assert_cors(response)
        assert 'html' in response.json
        assert 'width' in response.json
        assert 'maxwidth' in response.json
        assert 'height' in response.json
        assert 'maxheight' in response.json
        assert response.json['type'] == 'rich'
        assert response.json['version'] == '1.0'
        card = theme.render('dataset/card-xs.html', dataset=dataset)
        assert card in response.json['html']

    def test_oembed_for_dataset_with_organization(self, api):
        '''It should fetch a dataset in the oembed format with org.'''
        organization = OrganizationFactory()
        dataset = DatasetFactory(organization=organization)

        url = url_for('api.oembed', url=dataset.url_for())

        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert200(response)
        assert_cors(response)

        card = theme.render('dataset/card-xs.html', dataset=dataset)
        assert card in response.json['html']

    def test_oembed_for_dataset_redirect_link(self, api):
        '''It should fetch an oembed dataset using the redirect link.'''
        dataset = DatasetFactory()
        redirect_url = url_for('datasets.show_redirect',
                               dataset=dataset, _external=True)

        url = url_for('api.oembed', url=redirect_url)
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert200(response)
        assert_cors(response)
        assert 'html' in response.json
        assert 'width' in response.json
        assert 'maxwidth' in response.json
        assert 'height' in response.json
        assert 'maxheight' in response.json
        assert response.json['type'] == 'rich'
        assert response.json['version'] == '1.0'
        card = theme.render('dataset/card-xs.html', dataset=dataset)
        assert card in response.json['html']

    def test_oembed_for_unknown_dataset(self, api):
        '''It should raise a 404 on missing dataset.'''
        dataset_url = url_for('datasets.show', dataset='unknown',
                              _external=True)
        url = url_for('api.oembed', url=dataset_url)
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert404(response)
        assert_cors(response)

    def test_oembed_for_reuse(self, api):
        '''It should fetch a reuse in the oembed format.'''
        reuse = ReuseFactory()

        url = url_for('api.oembed', url=reuse.url_for())
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert200(response)
        assert_cors(response)
        assert 'html' in response.json
        assert 'width' in response.json
        assert 'maxwidth' in response.json
        assert 'height' in response.json
        assert 'maxheight' in response.json
        assert response.json['type'] == 'rich'
        assert response.json['version'] == '1.0'
        card = theme.render('reuse/oembed.html', reuse=reuse)
        assert card in response.json['html']

    def test_oembed_for_org(self, api):
        '''It should fetch an organization in the oembed format.'''
        org = OrganizationFactory()

        url = url_for('api.oembed', url=org.url_for())
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert200(response)
        assert_cors(response)
        assert 'html' in response.json
        assert 'width' in response.json
        assert 'maxwidth' in response.json
        assert 'height' in response.json
        assert 'maxheight' in response.json
        assert response.json['type'] == 'rich'
        assert response.json['version'] == '1.0'
        card = theme.render('organization/card.html', organization=org)
        assert card in response.json['html']

    def test_oembed_without_url(self, api):
        '''It should fail at fetching an oembed without a dataset.'''
        response = api.get(url_for('api.oembed'))
        assert400(response)
        assert 'url' in response.json['errors']

    def test_oembed_with_an_invalid_url(self, api):
        '''It should fail at fetching an oembed with an invalid URL.'''
        response = api.get(url_for('api.oembed', url='123456789'))
        assert400(response)
        assert 'url' in response.json['errors']

    def test_oembed_with_an_unknown_url(self, api):
        '''It should fail at fetching an oembed with an invalid URL.'''
        url = url_for('api.oembed', url='http://local.test/somewhere')
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert404(response)
        assert_cors(response)

    def test_oembed_with_port_in_https_url(self, api):
        '''It should works on HTTPS URLs with explicit port.'''
        dataset = DatasetFactory()
        url = dataset.url_for().replace('http://local.test/', 'https://local.test:443/')
        api_url = url_for('api.oembed', url=url)

        assert200(api.get(api_url, base_url='https://local.test:443/'))

    def test_oembed_does_not_support_xml(self, api):
        '''It does not support xml format.'''
        dataset = DatasetFactory()
        url = url_for('api.oembed', url=dataset.url_for(), format='xml')
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert_status(response, 501)
        assert_cors(response)
        assert response.json['message'] == 'Only JSON format is supported'


class OEmbedSettings(Testing):
    ACTIVATE_TERRITORIES = True
    TEST_WITH_THEME = True
    TEST_WITH_PLUGINS = True
    PLUGINS = ['front']
    THEME = 'gouvfr'


class OEmbedsDatasetAPITest:
    modules = []
    settings = OEmbedSettings

    @pytest.fixture(autouse=True)
    def copy_territoy_datasets(self):
        self.territory_datasets_backup = {
            k: copy.deepcopy(v) for k, v in TERRITORY_DATASETS.items()
        }
        yield
        TERRITORY_DATASETS.update(self.territory_datasets_backup)

    def test_oembeds_dataset_api_get(self, api):
        '''It should fetch a dataset in the oembed format.'''
        dataset = DatasetFactory()

        url = url_for('api.oembeds',
                      references='dataset-{id}'.format(id=dataset.id))
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert200(response)
        data = response.json[0]
        assert 'html' in data
        assert 'width' in data
        assert 'maxwidth' in data
        assert 'height' in data
        assert 'maxheight' in data
        assert data['type'] == 'rich'
        assert data['version'] == '1.0'
        assert dataset.title in data['html']
        assert dataset.url_for() in data['html']
        assert 'placeholders/default.png' in data['html']
        assert mdstrip(dataset.description, 110) in data['html']

    def test_oembeds_dataset_api_get_with_organization(self, api):
        '''It should fetch a dataset in the oembed format with org.'''
        organization = OrganizationFactory()
        dataset = DatasetFactory(organization=organization)

        url = url_for('api.oembeds',
                      references='dataset-{id}'.format(id=dataset.id))
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert200(response)
        data = response.json[0]
        assert organization.name in data['html']
        assert organization.url_for() in data['html']

    def test_oembeds_dataset_api_get_without_references(self, api):
        '''It should fail at fetching an oembed without a dataset.'''
        response = api.get(url_for('api.oembeds'))
        assert400(response)
        assert 'references' in response.json['errors']

    def test_oembeds_dataset_api_get_without_good_id(self, api):
        '''It should fail at fetching an oembed without a good id.'''
        response = api.get(url_for('api.oembeds', references='123456789'))
        assert400(response)
        assert response.json['message'] == 'Invalid ID.'

    def test_oembeds_dataset_api_get_without_good_item(self, api):
        '''It should fail at fetching an oembed with a wrong item.'''
        user = UserFactory()

        url = url_for('api.oembeds', references='user-{id}'.format(id=user.id))
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert400(response)
        assert response.json['message'] == 'Invalid object type.'

    def test_oembeds_dataset_api_get_without_valid_id(self, api):
        '''It should fail at fetching an oembed without a valid id.'''
        url = url_for('api.oembeds', references='dataset-123456789')
        response = api.get(url, headers={'Origin': 'http://localhost'})
        assert400(response)
        assert response.json['message'] == 'Unknown dataset ID.'
