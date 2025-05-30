import calendar
import html
import logging
import slugify

from datetime import date, datetime
from urllib.parse import urlsplit, urlunsplit

from babel.numbers import format_decimal
from flask import g, url_for, request, current_app, json, Request
from flask_restx import marshal
from jinja2 import pass_context
from markupsafe import Markup
from werkzeug.urls import url_decode, url_encode

from . import front

from udata.core.dataset.apiv2 import dataset_fields
from udata.core.dataset.models import Dataset
from udata.core.dataservices.models import Dataservice
from udata.core.organization.models import Organization
from udata.core.organization.constants import (
    ASSOCIATION,
    COMPANY,
    LOCAL_AUTHORITY,
    PUBLIC_SERVICE,
)
from udata.core.reuse.models import Reuse
from udata.models import db
from udata.i18n import get_locale, format_date, format_timedelta, _, pgettext
from udata.search.result import SearchResult
from udata.utils import camel_to_lodash
from udata_front.theme import theme_static_with_version

log = logging.getLogger(__name__)


@front.app_template_global()
def now():
    return datetime.now()


@front.app_template_global(name='form_grid')
def form_grid(specs):
    if not specs:
        return None
    label_sizes, control_sizes, offset_sizes = [], [], []
    for spec in specs.split(','):
        label_sizes.append('fr-col-{0}'.format(spec))
        size, col = spec.split('-')
        offset_sizes.append('fr-col-offset-{0}-{1}'.format(size, col))
        col = 12 - int(col)
        control_sizes.append('fr-col-{0}-{1}'.format(size, col))
    return {
        'label': ' '.join(label_sizes),
        'control': ' '.join(control_sizes),
        'offset': ' '.join(offset_sizes),
    }


@front.app_template_global()
@front.app_template_filter()
def url_rewrite(url=None, **kwargs):
    scheme, netloc, path, query, fragments = urlsplit(url or request.url)
    params = url_decode(query)
    for key, value in kwargs.items():
        params.setlist(key,
                       value if isinstance(value, (list, tuple)) else [value])
    return Markup(urlunsplit((scheme, netloc, path, url_encode(params),
                              fragments)))


@front.app_template_global()
@front.app_template_filter()
def url_add(url=None, **kwargs):
    scheme, netloc, path, query, fragments = urlsplit(url or request.url)
    params = url_decode(query)
    for key, value in kwargs.items():
        if value not in params.getlist(key):
            params.add(key, value)
    return Markup(urlunsplit((scheme, netloc, path, url_encode(params),
                              fragments)))


@front.app_template_global()
@front.app_template_filter()
def url_del(url=None, *args, **kwargs):
    scheme, netloc, path, query, fragments = urlsplit(url or request.url)
    params = url_decode(query)
    for key in args:
        params.poplist(key)
    for key, value in kwargs.items():
        lst = params.poplist(key)
        if str(value) in lst:
            lst.remove(str(value))
        params.setlist(key, lst)
    return Markup(urlunsplit((scheme, netloc, path, url_encode(params),
                              fragments)))


@front.app_template_global()
def in_url(*args, **kwargs):
    scheme, netloc, path, query, fragments = urlsplit(request.url)
    params = url_decode(query)
    return (
            all(arg in params for arg in args) and
            all(key in params and params[key] == value
                for key, value in kwargs.items())
    )


@front.app_template_global()
def beta_admin_url_for(path, fallback_path, **kwargs):
    '''
    A helper to route to the new admin if available.
    If NEW_ADMIN_URL is defined, we build the target url pointing to it using `path`.
    Else we route to the old admin using `fallback_path`.
    Kwargs are forwarded as as params in the first case
    and as arguments of url_for in the seconde case.
    '''
    if current_app.config['NEW_ADMIN_URL']:
        scheme, netloc, path, query, fragments = urlsplit(
            current_app.config['NEW_ADMIN_URL'].rstrip('/') + '/' + path.lstrip('/')
        )
        return urlunsplit((scheme, netloc, path, url_encode(kwargs), fragments))
    return url_for('admin.index', path=fallback_path, **kwargs)


@front.app_template_filter()
@pass_context
def placeholder(ctx, url, name='default', external=False):
    return url or theme_static_with_version(
        ctx,
        filename='img/placeholders/{0}.png'.format(name),
        external=external)


@front.app_template_filter()
def placeholder_alt(alt, url):
    return alt if url else ''


@front.app_template_filter()
def obfuscate(email):
    """Poor-man obfuscation, don't forget the |safe filter after it."""
    return email.replace('@', '%40').replace('.', '&#46;')


@front.app_template_filter()
@pass_context
def avatar_url(ctx, obj, size, external=False):
    if hasattr(obj, 'avatar') and obj.avatar:
        return obj.avatar(size, external=external)
    elif hasattr(obj, 'logo') and obj.logo:
        return obj.logo(size, external=external)
    else:
        return url_for('api.avatar', identifier=str(obj.id),
                       size=size, _external=external)


@front.app_template_filter()
@pass_context
def owner_avatar_url(ctx, obj, size=32, external=False):
    if hasattr(obj, 'organization') and obj.organization:
        return (obj.organization.logo(size, external=external)
                if obj.organization.logo
                else placeholder(ctx, None, name='organization', external=external))
    elif hasattr(obj, 'owner') and obj.owner:
        return avatar_url(ctx, obj.owner, size, external=external)
    return placeholder(ctx, None, name='user', external=external)


@front.app_template_global()
@front.app_template_filter()
def owner_url(obj, external=False):
    if hasattr(obj, 'organization') and obj.organization:
        return url_for('organizations.show', org=obj.organization, _external=external)
    elif hasattr(obj, 'owner') and obj.owner:
        return url_for('users.show', user=obj.owner, _external=external)
    return ''


@front.app_template_filter()
@pass_context
def avatar(ctx, user, size, classes='', external=False):
    markup = ''.join((
        '<a class="avatar {classes}" href="{url}" title="{title}">',
        '<img src="{avatar_url}" class="avatar" alt="{title}" ',
        'width="{size}" height="{size}"/>',
        '</a>'
    )).format(
        title=getattr(user, 'fullname', _('Anonymous user')),
        url=(url_for('users.show', user=user, _external=external)
             if user and getattr(user, 'id', None) else '#'),
        size=size,
        avatar_url=avatar_url(ctx, user, size, external=external),
        classes=classes
    )
    return Markup(markup)


@front.app_template_filter()
@pass_context
def owner_avatar(ctx, obj, size=32, classes='', external=False):
    markup = '''
        <a class="avatar {classes}" href="{url}" title="{title}">
            <img src="{avatar_url}" class="avatar" alt="{title}"
            width="{size}" height="{size}"/>
        </a>
    '''
    return Markup(markup.format(
        title=owner_name(obj),
        url=owner_url(obj, external=external),
        size=size,
        avatar_url=owner_avatar_url(ctx, obj, size, external=external),
        classes=classes
    ))


@front.app_template_global()
@front.app_template_filter()
def owner_name(obj):
    if hasattr(obj, 'organization') and obj.organization:
        return obj.organization.name
    elif hasattr(obj, 'owner') and obj.owner:
        return obj.owner.fullname
    return ''


@front.app_template_global()
@front.app_template_filter()
def owner_name_acronym(obj):
    if hasattr(obj, 'organization') and obj.organization:
        return obj.organization.acronym if obj.organization.acronym else obj.organization.name
    elif hasattr(obj, 'owner') and obj.owner:
        return obj.owner.fullname
    return ''


@front.app_template_global()
def organization_type(org: Organization):
    if org.local_authority:
        return LOCAL_AUTHORITY
    elif org.public_service:
        return PUBLIC_SERVICE
    elif org.association:
        return ASSOCIATION
    elif org.company:
        return COMPANY
    else:
        return ""


@front.app_template_global()
def external_source(dataset):
    return dataset.harvest.remote_url if dataset.harvest else None


@front.app_template_global()
def is_current_tab(request: Request, tab_arg: str) -> bool:
    args = request.args
    return tab_arg in args.to_dict() if args else False


@front.app_template_global()
@front.app_template_filter()
def isodate(value, format='short'):
    dt = date(*map(int, value.split('-')))
    return format_date(dt, format)


@front.app_template_global()
@front.app_template_filter()
def isoformat(value):
    return value.isoformat()


front.add_app_template_filter(camel_to_lodash)


@front.app_template_global()
@front.app_template_filter()
def tooltip_ellipsis(source, length=0):
    ''' return the plain text representation of markdown encoded text.  That
    is the texted without any html tags.  If ``length`` is 0 then it
    will not be truncated.'''
    try:
        length = int(length)
    except ValueError:  # invalid literal for int()
        return source  # Fail silently.
    ellipsis = '<a href v-tooltip title="{0}">...</a>'.format(source)
    return Markup((source[:length] + ellipsis)
                  if len(source) > length and length > 0 else source)


@front.app_template_global()
@front.app_template_filter()
def percent(value, max_value, over=False):
    percent = (value or 0) * 100. / max_value
    return percent if over else min(percent, 100)


def is_first_month_day(date):
    return date.day == 1


def is_last_month_day(date):
    _, last_day = calendar.monthrange(date.year, date.month)
    return date.day == last_day


def is_first_year_day(date):
    return date.day == 1 and date.month == 1


def is_last_year_day(date):
    return date.month == 12 and is_last_month_day(date)


def short_month(date):
    return format_date(date, pgettext('month-format', 'yyyy/MM'))


def short_day(date):
    return format_date(date, pgettext('day-format', 'yyyy/MM/dd'))


def daterange_with_details(value):
    '''Display a date range in the shorter possible maner.'''
    if value.end:
        delta = value.end - value.start
    else:
        delta = None

    start, explicit_end = None, None
    if is_first_year_day(value.start) and (not value.end or is_last_year_day(value.end)):
        start = value.start.year
        if delta and delta.days > 365:
            explicit_end = value.end.year
    elif is_first_month_day(value.start) and (not value.end or is_last_month_day(value.end)):
        start = short_month(value.start)
        if delta and delta.days > 31:
            explicit_end = short_month(value.end)
    else:
        start = short_day(value.start)
        if value.end and value.start != value.end:
            explicit_end = short_day(value.end)
    if explicit_end:
        return _('%(start)s to %(end)s', start=start, end=explicit_end)
    if not value.end:
        return _('since %(start)s', start=start)
    return start


@front.app_template_global()
@front.app_template_filter()
def daterange(value, details=False):
    '''Display a date range in the shorter possible maner.'''
    if not isinstance(value, db.DateRange):
        raise ValueError('daterange only accept db.DateRange as parameter')

    if details:
        return daterange_with_details(value)

    date_format = '%Y'
    start = value.start.strftime(date_format)

    explicit_end = None
    if value.end:
        delta = value.end - value.start
        if delta.days > 365:
            explicit_end = value.end.strftime(date_format)

    if explicit_end:
        return '{start!s}–{end!s}'.format(start=start, end=explicit_end)
    if not value.end:
        return _('since %(start)s', start=start)
    return start


def format_from_now(value):
    '''
    Format date as relative from now.
    It displays "today" or format_timedelta content, based on date.
    '''
    today = date.today()
    value_without_time = value.date()
    if value_without_time == today:
        return _("today")
    return format_timedelta(value_without_time - today, add_direction=True)


@front.app_template_filter()
def format_based_on_date(value):
    '''
    Format date relative form now if date is less than a month ago.
    Otherwise, show a formatted date.
    '''
    delta = date.today() - value.date()
    if delta.days > 30:
        return _("on %(date)s", date=format_date(value, "long"))
    return format_from_now(value)


@front.app_template_filter()
@front.app_template_global()
def i18n_alternate_links():
    """Render the <link rel="alternate" hreflang />

    if page is in a I18nBlueprint
    """
    if (not request.endpoint or
            not current_app.url_map.is_endpoint_expecting(request.endpoint,
                                                          'lang_code')):
        return Markup('')

    try:
        LINK_PATTERN = (
            '<link rel="alternate" href="{url}" hreflang="{lang}" />')
        links = []

        for lang in current_app.config['LANGUAGES']:
            url = language_url(lang)
            links.append(LINK_PATTERN.format(url=url, lang=lang))
        return Markup(''.join(links))
    except Exception:
        # Never fails
        return Markup('')


@front.app_template_filter()
@front.app_template_global()
def to_json(data):
    '''Convert data to JSON, you may have to use |safe after it.'''
    if not data:
        return Markup('')
    return json.dumps(data)


def is_results_of_type(search_results, result_type):
    return isinstance(search_results, SearchResult) and all(
        isinstance(dataset, result_type) for dataset in search_results)


@front.app_template_filter()
def to_api_format(data):
    if is_results_of_type(data, Dataset):
        return [to_dataset_api_format(d) for d in data]
    return list(data)


def to_dataset_api_format(dataset):
    return marshal(dataset, dataset_fields)


@front.app_template_filter()
def to_dataservice_api_format(dataservice):
    return marshal(dataservice, Dataservice.__read_fields__)


@front.app_template_filter()
def to_reuse_api_format(reuse):
    return marshal(reuse, Reuse.__read_fields__)


@front.app_template_filter()
@front.app_template_global()
def format_number(number):
    '''A locale aware formatter.'''
    return format_decimal(number, locale=g.lang_code) if number else number


@front.app_template_filter()
def format_percentage(number):
    '''A locale aware formatter.'''
    return format_decimal(number, locale=g.lang_code, format='0.########') if number else number


def json_ld_script_preprocessor(o):
    if isinstance(o, dict):
        return {k: json_ld_script_preprocessor(v) for k, v in o.items()}
    elif isinstance(o, (list, tuple)):
        return [json_ld_script_preprocessor(v) for v in o]
    elif isinstance(o, str):
        return html.escape(o).replace('&#x27;', '&apos;')
    else:
        return o


@front.app_template_filter()
def embedded_json_ld(jsonld):
    '''
    Sanitize JSON-LD for <script> tag inclusion.

    JSON-LD accepts any string but there is a special case
    for script tag inclusion.
    See: https://w3c.github.io/json-ld-syntax/#restrictions-for-contents-of-json-ld-script-elements
    '''
    return Markup(json.dumps(json_ld_script_preprocessor(jsonld), ensure_ascii=False))


@front.app_template_filter()
def visibles(value):
    '''Return visible elements'''
    if not isinstance(value, list):
        raise ValueError('visibles only accept list as parameter')
    return list(filter(lambda elt: elt.is_visible, value))


@front.app_template_global()
def selected(current_value, value):
    return 'selected' if current_value == value else ''


@front.app_template_filter()
def summarize(value: int):
    result = float(value) if value else 0
    for unit in '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z':
        if abs(result) < 1000:
            return format_decimal(round(result, 1), locale=g.lang_code) + unit
        result /= 1000


@front.app_template_filter()
def slug(value):
    return slugify.slugify(value)


@front.app_template_global()
def current_language_name():
    '''Get the name of the current locale.'''
    locale = get_locale()
    for code, name in current_app.config['LANGUAGES'].items():
        if locale == code:
            return name


@front.app_template_global()
def language_url(lang_code):
    '''Create an URL for the current endpoint and the given language code'''
    params = {}
    endpoint = request.endpoint
    if request.args:
        params.update(request.args)
    if request.view_args:
        params.update(request.view_args)
    if (not request.endpoint or
            not current_app.url_map.is_endpoint_expecting(request.endpoint,
                                                          'lang_code')):
        endpoint = "site.home"
    try:
        return url_for(endpoint, lang_code=lang_code, **params, _external=True)
    except Exception:
        # Never fails
        return url_for("site.home", lang_code=lang_code, _external=True)
