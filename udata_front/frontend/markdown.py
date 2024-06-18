from udata.frontend.markdown import mistune, UDataMarkdown


class Renderer(mistune.Renderer):
    def table(self, header, body):
        return (
            '<div class=\"fr-table\">\n<table>\n<thead>\n%s</thead>\n'
            '<tbody>\n%s</tbody>\n</table>\n</div>\n'
        ) % (header, body)


class UDataFrontMarkdown(UDataMarkdown):
    """Consistent with Flask's extensions signature."""

    def __init__(self, app):
        app.jinja_env.filters['markdown'] = self.__call__
        renderer = Renderer(escape=False, hard_wrap=True)
        self.markdown = mistune.Markdown(renderer=renderer)


def init_app(app):
    app.extensions['markdown'] = UDataFrontMarkdown(app)
