from collections import OrderedDict
from datetime import date, datetime, timedelta
import logging
import requests
from typing import Union, List, Dict

from bson import ObjectId
from dateutil.rrule import rrule, MONTHLY
from flask import current_app
from pymongo.command_cursor import CommandCursor
from mongoengine import QuerySet

from udata.app import cache


log = logging.getLogger(__name__)

METRICS_CACHE_DURATION = 60 * 60  # in seconds


def monthly_labels():
    return [month.strftime("%Y-%m") for month in rrule(
            MONTHLY,
            dtstart=date.today() - timedelta(days=365),
            until=date.today()
            )]


def compute_monthly_metrics(metrics_data: List[Dict], metrics_labels: List[str]) -> Dict:
    # Initialize default monthly_metrics
    monthly_metrics = OrderedDict(
        (month, {label: 0 for label in metrics_labels}) for month in monthly_labels()
    )
    # Update monthly_metrics with metrics_data values
    for entry in metrics_data:
        entry_month = entry['metric_month']
        if entry_month in monthly_metrics:
            for metric_label in metrics_labels:
                label = f'monthly_{metric_label}'
                monthly_metrics[entry_month][metric_label] = entry.get(label) or 0
    return monthly_metrics


def metrics_by_label(monthly_metrics: Dict, metrics_labels: List[str]) -> List[List[int]]:
    metrics_by_label = []
    for label in metrics_labels:
        metrics_by_label.append({month: monthly_metrics[month][label] for month in monthly_metrics})
    return metrics_by_label


@cache.memoize(METRICS_CACHE_DURATION)
def get_metrics_for_model(
            model: str,
            id: Union[str, ObjectId],
            metrics_labels: List[str]
        ) -> List[List[int]]:
    '''
    Get distant metrics for a particular model object
    This uses @cache.cached decorator w/ short lived cache
    '''

    print(repr(model), repr(id), repr(metrics_labels))

    reuse_metrics_api = f'{current_app.config["METRICS_API"]}/{model}s'
    try:

        res = requests.get(reuse_metrics_api, params={
            f'{model}_id': f'eq.{id}'
        })
        res.raise_for_status()
        monthly_metrics = compute_monthly_metrics(res.json(), metrics_labels)
        return metrics_by_label(monthly_metrics, metrics_labels)
    except requests.exceptions.RequestException as e:
        log.exception(f'Error while getting metrics for {model}({id}): {e}')


# @cache.memoize(METRICS_CACHE_DURATION)
# def get_stock_metrics(objects: QuerySet, date_label: str = 'created_at') -> List[int]:
#     monthly_metrics = OrderedDict((date_month.strftime("%Y-%m"), 0) for date_month in rrule(
#             MONTHLY,
#             dtstart=date.today() - timedelta(days=365),
#             until=date.today())
#     )
#     objects = objects.filter(**{f'{date_label}__gte': date.today() - timedelta(days=365)})
#     for document in objects:
#         document_date = getattr(document, date_label).strftime("%Y-%m")
#         if document_date in monthly_metrics:
#             monthly_metrics[document_date] += 1
#     print(monthly_metrics)
#     return monthly_metrics


def compute_monthly_aggregated_metrics(aggregation_res: CommandCursor):
    monthly_metrics = OrderedDict((month, 0) for month in monthly_labels())
    for monthly_count in aggregation_res:
        year, month = monthly_count['_id'].split('-')
        monthly_label = year + '-' + month.zfill(2)
        if monthly_label in monthly_metrics:
            monthly_metrics[monthly_label] = monthly_count['count']
    return monthly_metrics


@cache.memoize(METRICS_CACHE_DURATION)
def get_stock_metrics(objects: QuerySet, date_label: str = 'created_at') -> List[int]:
    '''
    Get stock metrics for a particular model object
    This uses @cache.cached decorator w/ short lived cache

    TODO: check memoization https://flask-caching.readthedocs.io/en/latest/
    > Using mutable objects (classes, etc) as part of the cache key can become tricky [...]
    '''
    print(repr(objects))
    pipeline = [
        {
            '$match': {
                date_label: {'$gte': datetime.now() - timedelta(days=365)}
            }
        },
        {
            '$group': {
                '_id': {'$concat': [
                    {'$substr': [{'$year': f'${date_label}'}, 0, 4]},
                    '-',
                    {'$substr': [{'$month': f'${date_label}'}, 0, 12]}
                ]},
                'count': {'$sum': 1}
            }
        }
    ]
    aggregation_res = objects.aggregate(*pipeline)

    return compute_monthly_aggregated_metrics(aggregation_res)
