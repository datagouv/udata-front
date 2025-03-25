from udata.frontend.markdown import mistune, UDataMarkdown


class UDataFrontMarkdown(UDataMarkdown):
    """Consistent with Flask's extensions signature."""

    def __init__(self, app):
        app.jinja_env.filters['markdown'] = self.__call__
        self.markdown = mistune.create_markdown(
            escape=False, hard_wrap=True, plugins=["table", "strikethrough"]
        )


def init_app(app):
    app.extensions['markdown'] = UDataFrontMarkdown(app)
