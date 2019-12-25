import hmac
from concurrent.futures.thread import ThreadPoolExecutor

from flask import jsonify

from verbund_soap_client.errors import StopEventLocationUnservedError
from verbund_soap_client.verbund_soap_client import VDVClient

KEY = b'$yaHa0g2wZDKB9S2n%r^%dlZ3B@rXOIU'

def hash_password(password: str, key=KEY) -> str:
    """
    Attention: used in migration 02
    :param password:
    :param key:
    :return:
    """
    return hmac.new(key, str.encode(password), 'sha256').hexdigest()


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def error(error_code, status_code=400):
    return jsonify({'error': error_code}), status_code


class Errors:
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
    SLUG_ALREADY_EXISTS_ERROR = 'SLUG_ALREADY_EXISTS_ERROR'
    OBJECT_NOT_FOUND_ERROR = 'OBJECT_NOT_FOUND_ERROR'


def get_timetable_for_stop_point_ref(stop_point_ref):
    try:
        vdv_response = VDVClient().stop_event_request(stop_point_ref)
    except StopEventLocationUnservedError:
        return []

    event_list = []
    for event in vdv_response:
        _service = event['StopEvent']['Service']
        _call_at_stop = event['StopEvent']['ThisCall']['CallAtStop']
        event_list.append({
            'destination': _service['DestinationText']['Text'],
            'origin': _service['OriginText']['Text'],
            'direction': _service['DirectionRef'],
            'mode': _service['Mode']['PtMode'],
            'line': _service['PublishedLineName']['Text'],
            'route_description': _service['RouteDescription']['Text'],
            'stop_point_ref': _call_at_stop['StopPointRef'],
            'stop_point_name': _call_at_stop['StopPointName']['Text'],
            'departure': _call_at_stop['ServiceDeparture']['TimetabledTime'],
            'stop_seq_number': _call_at_stop['StopSeqNumber']
        })
    return event_list

def get_timetable_for_stop_point_ref_list_multithreaded(stop_point_ref_list, max_workers=10):
    """
    retrieves a list of stop_point_ref's, starting at the same time to lower waiting time
    waits until every request finsished and returns a list of timetables
    """
    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        for stop_point_ref in stop_point_ref_list:
            results.append(executor.submit(get_timetable_for_stop_point_ref, stop_point_ref))
    # ok, all jobs done, get results and map them into a list of their results:
    return map(lambda res: res.result(), results)