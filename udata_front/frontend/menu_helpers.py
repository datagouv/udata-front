from xmlrpc.client import Boolean
from udata_front.frontend import front
from flask_navigation.item import Item
from flask import Request

def get_current_endpoint(request: Request):
    return request.url_rule.endpoint.split('.')[:1] if request.url_rule else None


@front.app_template_global()
def is_current_endpoint(request: Request, item: Item) -> Boolean:
    current_endpoint = get_current_endpoint(request)
    item_endpoint = item.endpoint and item.endpoint.split('.')[:1] 
    return request.url_rule.endpoint != "site.home" and (item_endpoint == current_endpoint)

@front.app_template_global()
def is_current_page(request: Request, item: Item) -> Boolean:
    return is_current_endpoint(request, item) and item.args == request.view_args


@front.app_template_global()
def is_parent_of_current_endpoint(request: Request, items: list[Item]) -> Boolean:
    current_item_in_items = map(lambda item: is_current_page(request, item), items)
    return any(current_item_in_items)