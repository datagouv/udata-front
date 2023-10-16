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

# Frontend data search form url
DATA_SEARCH_FEEDBACK_FORM_URL = ''

# Frontend forms url
DISCOVERABILITY_FORM_URL = ''

# Static pages from github repo
PAGES_GH_REPO_NAME = 'etalab/datagouvfr-pages'
PAGES_REPO_BRANCH = 'master'

# api.gouv.fr
APIGOUVFR_URL = 'https://api.gouv.fr/api/v1/apis'
APIGOUVFR_ALLOW_OPENNESS = ['open', 'semi_open']

# Guides
GUIDES_URL = 'https://guides.data.gouv.fr/'
GUIDES_USER_ACCOUNT_URL = 'https://guides.data.gouv.fr/publier-des-donnees/guide-data.gouv.fr/creer-un-compte-utilisateur-et-rejoindre-une-organisation' # noqa
GUIDES_ORGANIZATION_URL = 'https://guides.data.gouv.fr/publier-des-donnees/guide-data.gouv.fr/organisation/creer-une-organisation' # noqa
GUIDES_DATASET_URL = 'https://guides.data.gouv.fr/publier-des-donnees/guide-data.gouv.fr/jeux-de-donnees/publier-un-jeu-de-donnees' # noqa
GUIDES_REUSE_URL = 'https://guides.data.gouv.fr/publier-des-donnees/guide-data.gouv.fr/reutilisations' # noqa
GUIDES_COMMUNITY_URL = 'https://guides.data.gouv.fr/publier-des-donnees/guide-data.gouv.fr/ressource-communautaire' # noqa
GUIDES_QUALITY_URL = 'https://guides.data.gouv.fr/publier-des-donnees/guide-qualite/ameliorer-la-qualite-dun-jeu-de-donnees-en-continu/ameliorer-le-score-de-qualite-des-metadonnees' # noqa

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
MONCOMPETPRO_OPENID_CONF_URL = None
MONCOMPETPRO_SCOPE = None
MONCOMPETPRO_CLIENT_ID = None
MONCOMPETPRO_CLIENT_SECRET = None

# Newsletter
NEWSLETTER_SUBSCRIPTION_URL = 'https://f.info.data.gouv.fr/f/lp/infolettre-data-gouv-fr-landing-page/lk3q01y6'  # noqa

# Metrics API
METRICS_API = None
