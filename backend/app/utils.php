<?php
$REFERENCE_POINT_LIST = array(
    'uni' => 'at:46:8917',
    'hauptplatz' => 'at:46:4046',
    'mozartgasse' =>'at:46:4131',
    'resowi' => 'at:46:4208' ,
    'attemsgasse' => 'at:46:4412',
    'unimensa'=> 'at:46:8918',
    'geidorfplatz' => 'at:46:8916',);

function get_request_string($stop_point_ref){
    return '<?xml version="1.0" encoding="UTF-8"?>
    <Trias version="1.1" xmlns="http://www.vdv.de/trias"; xmlns:siri="http://www.siri.org.uk/siri"; xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"; xsi:schemaLocation="http://www.vdv.de/trias file:///C:/development/HEAD/extras/TRIAS/TRIAS_1.1/Trias.xsd">
        <ServiceRequest>
            <RequestPayload>
                <StopEventRequest>
                    <Location>
                        <LocationRef>
                            <StopPointRef>'.$stop_point_ref.'</StopPointRef>
                        </LocationRef>
                    </Location>
                </StopEventRequest>
            </RequestPayload>
        </ServiceRequest>
    </Trias>';
}

function get_stop_point_ref_from_name($name){
    global $REFERENCE_POINT_LIST;
    return $REFERENCE_POINT_LIST[$name];
}

function get_stop_point_list(){
    global $REFERENCE_POINT_LIST;
    return array_keys($REFERENCE_POINT_LIST);
}

function get_data_from_stop_point_ref($stop_point_ref){
    $req_string = get_request_string($stop_point_ref);

    // sende xml request
    $url = 'http://ogdtrias.verbundlinie.at:8183/stv/trias';
    $options = array(
        'http' => array(
            'header'  => "Content-type: text/xml\r\n",
            'method'  => 'POST',
            'content' => $req_string,
        ),
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result == false){
        echo('fehler, bad response');
        exit();
    }

    // verarbeite xml response und speichere alles in variable $data
    $data = array();

    $resp_xml = new SimpleXMLElement($result);
    $stop_event_results = $resp_xml->ServiceDelivery->DeliveryPayload->StopEventResponse->StopEventResult;
    foreach ($stop_event_results as $stop_event_result){
        $stop_event = $stop_event_result->StopEvent;

        $call_at_stop = $stop_event->ThisCall->CallAtStop;
        $service = $stop_event->Service;

        $actData = array(
            'line' => (string)$service->PublishedLineName->Text,
            'routeDesc' => (string)$service->RouteDescription->Text,
            'origin' => (string)$service->OriginText->Text,
            'dest' => (string)$service->DestinationText->Text,
            'dir_ref' => (string)$service->DirectionRef,
            'time' => strtotime((string)$call_at_stop->ServiceDeparture->TimetabledTime),
            'stop' => (string)$call_at_stop->StopPointName->Text,
            );
        $data[] = $actData;
    }

    return $data;
}
?>