from udata_front.frontend import front


@front.app_template_filter()
def filesize(value):
    '''Display a human readable filesize'''
    suffix = 'o'
    for unit in '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z':
        if abs(value) < 1024.0:
            return "%3.1f%s%s" % (value, unit, suffix)
        value /= 1024.0
    return "%.1f%s%s" % (value, 'Y', suffix)


@front.app_template_global()
def resource_image(resource):
    '''Display a human recognizable image for a resource'''
    formats = {
        'doc': 'documentation',
        'pdf': 'documentation',
        'json': 'code',
        'sql': 'code',
        'xml': 'code',
        '7z': 'archive',
        'tar.gz': 'archive',
        'rar': 'archive',
        'zip': 'archive',
        'url': 'link',
        'csv': 'table',
        'xls': 'table',
        'xlsx': 'table',
    }
    return 'svg/resources/{}.svg'.format(formats.get(resource.filetype, 'file'))
