import logging
import re

import feedparser
import requests

from dateutil.parser import parse
from flask import g, current_app, url_for

from udata_front import theme
from udata.app import cache
from udata.models import Dataset
from udata_front.frontend import nav
from udata.i18n import lazy_gettext as _


log = logging.getLogger(__name__)

RE_POST_IMG = re.compile(
    r'''
    <img .*? (?:(?:
        src="(?P<src>https?://.+?)"
        |
        srcset="(?P<srcset>.+?)"
        |
        sizes="(?P<sizes>.+?)"
    )\s*)+ .*?/>
    ''',
    re.I | re.X | re.S
)

RE_STRIP_TAGS = re.compile(r'</?(img|br|p|div|ul|li|ol)[^<>]*?>', re.I | re.M)

# Add some html5 allowed attributes
EXTRA_ATTRIBUTES = ('srcset', 'sizes')
feedparser.sanitizer._HTMLSanitizer.acceptable_attributes.update(set(EXTRA_ATTRIBUTES))

# Wordpress ATOM timeout
WP_TIMEOUT = 5

# Feed allowed enclosure type as thumbnails
FEED_THUMBNAIL_MIMES = ('image/jpeg', 'image/png', 'image/webp')


gouvfr_menu = nav.Bar('gouvfr_menu', [
    nav.Item(_('Data'), 'datasets.list'),
    nav.Item(_('API'), 'dataservices.list'),
    nav.Item(_('Reuses'), 'reuses.list'),
    nav.Item(_('Organizations'), 'organizations.list'),
    nav.Item(_(
            'Getting started on %(site)s',
            site=current_app.config.get('SITE_TITLE')
        ),
        None,
        items=[
            nav.Item(
                _('What is %(site)s?', site=current_app.config.get('SITE_TITLE')),
                'gouvfr.show_page',
                args={'slug': 'about/a-propos_data-gouv'}
            ),
            nav.Item(
                _('How to publish data ?'),
                'gouvfr.show_page',
                args={'slug': 'onboarding/producteurs'}
            ),
            nav.Item(
                _('How to use data ?'),
                'gouvfr.show_page',
                args={'slug': 'onboarding/reutilisateurs'}
            ),
            nav.Item(
                _('data.gouv.fr guides'),
                None,
                url=current_app.config.get('GUIDES_URL')
            ),
        ]
    ),
    nav.Item(_('News'), 'posts.list'),
    nav.Item(_('Write to us'), None, url=current_app.config.get('SUPPORT_URL', '#')),
])

theme.menu(gouvfr_menu)

opendata_links = [
    nav.Item(_('Topics'), 'gouvfr.show_page', args={'slug': 'thematiques-a-la-une'}),
    nav.Item(_('Reference Data'), 'gouvfr.show_page', args={'slug': 'spd/reference'}),
]

export_dataset_id = current_app.config.get('EXPORT_CSV_DATASET_ID')
if export_dataset_id:
    try:
        export_dataset = Dataset.objects.get(id=export_dataset_id)
    except Dataset.DoesNotExist:
        pass
    else:
        export_url = url_for('datasets.show', dataset=export_dataset,
                             _external=True)
        opendata_links.append(nav.Item(_('Data catalog'), None, url=export_url))
opendata_links.append(nav.Item(_('Follow data opening'), None,
                      url="https://ouverture.data.gouv.fr"))
opendata_links.append(nav.Item(_('Portal for European data'), None,
                      url="https://data.europa.eu"))

nav.Bar('gouvfr_opendata', opendata_links)


platform_links = [
    nav.Item(_('Guides'), None, url=current_app.config.get('GUIDES_URL', '#')),
    nav.Item(_('Roadmap and news'), 'gouvfr.show_page', args={'slug': 'roadmap'}),
    nav.Item(_('Write to us'), None, url=current_app.config.get('SUPPORT_URL', '#')),
    nav.Item(_('Give us your feedback'), None,
             url=current_app.config.get('FEEDBACK_FORM_URL', '#')),
    nav.Item(_('Statistics'), 'site.dashboard'),
]

nav.Bar('gouvfr_platform', platform_links)

resources_links = [
    nav.Item(_("api.gouv.fr"), None, url='https://api.gouv.fr'),
    nav.Item(_("schema.data.gouv.fr"), None,
             url=current_app.config.get('SCHEMA_DOCUMENTATION_URL', '#')),
    nav.Item("meteo.data.gouv.fr", None, url="https://meteo.data.gouv.fr"),
    nav.Item("transport.data.gouv.fr", None, url="https://transport.data.gouv.fr"),
    nav.Item("defis.data.gouv.fr", None, url="https://defis.data.gouv.fr"),
]

nav.Bar('gouvfr_resources', resources_links)

footer_links = [
    nav.Item(_('Licenses'), 'gouvfr.show_page', args={'slug': 'legal/licences'}),
    nav.Item(_('Terms of use'), 'gouvfr.show_page', args={'slug': 'legal/cgu'}),
    nav.Item(_('Tracking and privacy'), 'gouvfr.suivi'),
    nav.Item(_('Legal notice'), 'gouvfr.show_page', args={'slug': 'legal/legal-notice'}),
    nav.Item(_('Accessibility: partially compliant'),
             'gouvfr.show_page', args={'slug': 'legal/accessibility'}),
]

nav.Bar('gouvfr_footer', footer_links)

NETWORK_LINKS = [
    ('legifrance.gouv.fr', 'https://legifrance.gouv.fr'),
    ('info.gouv.fr', 'https://www.info.gouv.fr'),
    ('service-public.fr', 'https://www.service-public.fr'),
]

nav.Bar(
    'gouvfr_network',
    [nav.Item(label, label, url=url) for label, url in NETWORK_LINKS]
)


@cache.memoize(50)
def get_blog_post(lang):
    '''
    Extract the latest post summary from an RSS or an Atom feed.

    Image is searched and extracted from (in order of priority):
      - mediarss `media:thumbnail` attribute
      - enclosures of image type (first match)
      - first image found in content
    Image size is ot taken in account but could in future improvements.
    '''
    wp_atom_url = current_app.config.get('WP_ATOM_URL')
    if not wp_atom_url:
        return

    feed = None

    for code in lang, current_app.config['DEFAULT_LANGUAGE']:
        feed_url = wp_atom_url.format(lang=code)
        try:
            response = requests.get(feed_url, timeout=WP_TIMEOUT)
        except requests.Timeout:
            log.error('Timeout while fetching %s', feed_url, exc_info=True)
            continue
        except requests.RequestException:
            log.error('Error while fetching %s', feed_url, exc_info=True)
            continue
        feed = feedparser.parse(response.content)

        if len(feed.entries) > 0:
            break

    if not feed or len(feed.entries) <= 0:
        return

    post = feed.entries[0]

    blogpost = {
        'title': post.title,
        'link': post.link,
        'date': parse(post.published)
    }
    description = post.get('description', None)
    content = post.get('content', [{}])[0].get('value') or description
    summary = post.get('summary', content)
    blogpost['summary'] = RE_STRIP_TAGS.sub('', summary).strip()

    for thumbnail in post.get('media_thumbnail', []):
        blogpost['image_url'] = thumbnail['url']
        break

    if 'image_url' not in blogpost:
        for enclosure in post.get('enclosures', []):
            if enclosure.get('type') in FEED_THUMBNAIL_MIMES:
                blogpost['image_url'] = enclosure['href']
                break

    if 'image_url' not in blogpost:
        match = RE_POST_IMG.search(content)
        if match:
            blogpost['image_url'] = match.group('src').replace('&amp;', '&')
            if match.group('srcset'):
                blogpost['srcset'] = match.group('srcset').replace('&amp;', '&')
            if match.group('sizes'):
                blogpost['sizes'] = match.group('sizes')

    return blogpost


@theme.context('home')
def home_context(context):
    context['blogpost'] = get_blog_post(g.lang_code)
    return context
