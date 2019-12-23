import sys
import os
sys.path.append(os.path.join(os.path.dirname(sys.argv[0]), "../backend"))

from verbund_soap_client.verbund_soap_client import VDVClient

if __name__ == '__main__':
    # run some tests
    client = VDVClient()
    locations = client.location_information_request__nearby_gps(
        longitude='15.43837', latitude='47.07122')
    print(locations)
