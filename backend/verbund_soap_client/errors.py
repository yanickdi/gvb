ERROR_CODE_LOCATION_NO_RESULTS = '-8020'

class VerbundSoapClientError(Exception):
    pass


class UndefinedVerbundSoapClientError(VerbundSoapClientError):
    pass


class LocationInformationRequestNothingFoundError(Exception):
    pass
