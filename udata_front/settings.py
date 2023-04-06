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

# Number of resources to show resource search on dataset page
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
GUIDES_REUSE_URL = 'https://guides.etalab.gouv.fr/reutilisation/'
GUIDES_COMMUNITY_URL = 'https://guides.etalab.gouv.fr/data.gouv.fr/animer-communaute-reutilisateurs/#valoriser-les-usages-des-donnees' # noqa

# CAPTCHEtat

# You can activate CaptchEtat, a captcha.com integration by providing
# CAPTCHETAT_BASE_URL, CAPTCHETAT_OAUTH_BASE_URL, CAPTCHETAT_CLIENT_ID and CAPTCHETAT_CLIENT_SECRET
CAPTCHETAT_BASE_URL = None
CAPTCHETAT_OAUTH_BASE_URL = None
CAPTCHETAT_CLIENT_ID = None
CAPTCHETAT_CLIENT_SECRET = None
CAPTCHETAT_TOKEN_CACHE_KEY = 'captchetat-bearer-token'

# MonComptePro

# You can activate MonComptePro SSO, a moncomptepro.beta.gouv.fr login integration
MONCOMPETPRO_OPENID_CONF_URL = 'https://app-test.moncomptepro.beta.gouv.fr/.well-known/openid-configuration'
MONCOMPETPRO_SCOPE = 'openid email profile'
MONCOMPETPRO_CLIENT_ID = '277aa530830cac03a81a5670ec13d8677291658aa0b3138c733697c9915f4a2593d5faa968143f29e893aafb8a1ffba9593c52d46db13a27cf4d3fc3485ada90'
MONCOMPETPRO_CLIENT_SECRET = 'e25aa11f53f13a58e8c1fe022ddc0e07e240ec0c603f78535bf5ffd470c387be2e2edc348d6923fd718b989da08a40f241543d8c1e01bbaf88ad0ec84ed9140f'
MONCOMPETPRO_REDIRECT_URL = ''

# Newsletter
NEWSLETTER_SUBSCRIPTION_URL = 'https://f.info.data.gouv.fr/f/lp/infolettre-data-gouv-fr-landing-page/lk3q01y6'  # noqa
