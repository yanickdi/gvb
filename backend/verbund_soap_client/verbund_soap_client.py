import os
import requests
import xml.etree.ElementTree as et
import xmltodict

from verbund_soap_client.errors import \
    LocationInformationRequestNothingFoundError

ENV_KEY = 'VDV_BASE_URL'


class VDVClient:
    def __init__(self, base_url=None):
        if base_url:
            self.base_url = base_url
        elif os.environ.get(ENV_KEY, None):
            self.base_url = os.environ[ENV_KEY]
        else:
            raise Exception(
                f'You have to either pass base_url to VDVClient or ' +
                'set an env variable ({ENV_KEY}) to the soap uri')

    def build_request_xml(self, request_name: str,
                          request_payload: dict) -> str:
        trias = et.Element('Trias', version='1.1',
                           xmlns="http://www.vdv.de/trias")
        request_child = et.SubElement(
            et.SubElement(et.SubElement(trias, 'ServiceRequest'),
                          'RequestPayload'),
            request_name)
        append_dict_to_xml_node(request_child, request_payload)
        return '{}\n{}'.format('<?xml version="1.0" encoding="UTF-8"?>',
                               et.tostring(trias, encoding='unicode'))

    def send_request(self, request_name: str, request_payload: dict):
        request_payload_xml = self.build_request_xml(request_name,
                                                     request_payload)
        resp = requests.post(self.base_url, request_payload_xml,
                             headers={'Content-type': 'text/xml'})
        if resp.status_code != 200:
            raise Exception(
                f'Status {resp.status_code} returned by gvb soap interface')
        resp_dict = xmltodict.parse(resp.text)
        try:
            delivery_payload = resp_dict['Trias']['ServiceDelivery'][
                'DeliveryPayload']
        except KeyError:
            raise Exception(
                'Got an invalid response from VDV Soap Endpoint. No '
                'DeliveryPayload in response.')
        return delivery_payload

    def location_information_request__location_name(self, location_name: str):
        """
        Queries location info by passing a location names
        :param location_name: e.g. 'Graz Hauptbahnhof'
        """
        resp = self.send_request('LocationInformationRequest', {
            'InitialInput': {
                'LocationName': location_name
            }
        })
        return resp['LocationInformationResponse']['Location']

    def location_information_request__nearby_gps(self, longitude: str,
                                                 latitude: str,
                                                 radius: int = 100,
                                                 max_results: int = 10):
        """
        Queries location info by gps coordinates
        :param longitude: e.g. '15.43837'
        :param latitude:  e.g. '47.07122'
        :param radius: distance in meter, defaults to 100
        """
        resp =  self.send_request('LocationInformationRequest', {
            'InitialInput': {
                'GeoRestriction': {
                    'Circle': {
                        'Center': {
                            'Longitude': longitude,
                            'Latitude': latitude,
                        },
                        'Radius': radius
                    }
                }
            },
            'Restrictions': {
                'Type': 'stop',
                'NumberOfResults': 10
            }
        })['LocationInformationResponse']

        if 'ErrorMessage' in resp:
            if resp['ErrorMessage']['Code'] == '-20100':
                raise LocationInformationRequestNothingFoundError()
            raise Exception('Undefined Error')
        return resp


def append_dict_to_xml_node(root_node: et.Element,
                            payload_dict: dict) -> et.Element:
    return _recursive_dict_to_xml(root_node, payload_dict)


def _recursive_dict_to_xml(parent: et.Element,
                           current_branch: dict) -> et.Element:
    for key, elem in current_branch.items():
        if type(elem) == dict:
            # have to branch again:
            child_branch = et.SubElement(parent, key)
            _recursive_dict_to_xml(parent=child_branch, current_branch=elem)
        elif type(elem) in (str, int):
            child_elem = et.SubElement(parent, key)
            child_elem.text = str(elem)
        else:
            raise Exception(f'Cannot branch with type {type(elem)}. content:',
                            elem)
    return parent