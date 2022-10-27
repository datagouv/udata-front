"""
Default settings for udata-front
"""

# TODO: move this back to an extension
RESOURCES_SCHEMAGOUVFR_ENABLED = True
SCHEMA_GOUVFR_VALIDATA_URL = 'https://validata.etalab.studio'
SCHEMA_CATALOG_URL = 'https://schema.data.gouv.fr/schemas/schemas.json'
SCHEMA_DOCUMENTATION_URL = 'https://schema.data.gouv.fr/'

# Dataset settings
# Default page size for resources on dataset page
RESOURCES_DEFAULT_PAGE_SIZE = 6

# Default page size for resources on dataset page
RESOURCES_MIN_COUNT_TO_SHOW_SEARCH = 12

# Frontend banner parameters
BANNER_ACTIVATED = False
BANNER_HTML_CONTENT_EN = ''
BANNER_HTML_CONTENT_FR = ''

# Static pages from github repo
PAGES_GH_REPO_NAME = 'etalab/datagouvfr-pages'
PAGES_REPO_BRANCH = 'master'

# api.gouv.fr
APIGOUVFR_URL = 'https://api.gouv.fr/api/v1/apis'
APIGOUVFR_ALLOW_OPENNESS = ['open', 'semi_open']

# Etalab Guides
ETALAB_GUIDES_URL = 'https://guides.etalab.gouv.fr'
GUIDES_USER_ACCOUNT_URL = 'https://guides.etalab.gouv.fr/data.gouv.fr/creer-compte-utilisateur/'
GUIDES_ORGANIZATION_URL = 'https://guides.etalab.gouv.fr/data.gouv.fr/creer-rejoindre-organisation/'
GUIDES_DATASET_URL = 'https://guides.etalab.gouv.fr/data.gouv.fr/publier-jeu-de-donnees/'
GUIDES_REUSE_URL = 'https://guides.etalab.gouv.fr/reutilisation/publier-reutilisation/'

# CAPTCHEtat

# You can activate CaptchEtat, a captcha.com integration by providing
# CAPTCHETAT_BASE_URL, CAPTCHETAT_OAUTH_BASE_URL, CAPTCHETAT_CLIENT_ID and CAPTCHETAT_CLIENT_SECRET
CAPTCHETAT_BASE_URL = None
CAPTCHETAT_OAUTH_BASE_URL = None
CAPTCHETAT_CLIENT_ID = None
CAPTCHETAT_CLIENT_SECRET = None
CAPTCHETAT_TOKEN_CACHE_KEY = 'captchetat-bearer-token'
