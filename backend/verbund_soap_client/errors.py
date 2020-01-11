ERROR_CODE_LOCATION_NO_RESULTS = '-8020'
ERROR_CODE_STOP_EVENT_LOCATION_UNSERVED = '-4030'

class VerbundSoapClientError(Exception):
    pass

class StopEventLocationUnservedError(VerbundSoapClientError):
    pass


class UndefinedVerbundSoapClientError(VerbundSoapClientError):
    pass


class LocationInformationRequestNothingFoundError(Exception):
    pass

