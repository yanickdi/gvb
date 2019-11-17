<?php
namespace Gvb;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Views{

    public static function getListStops(Request $req, Response $resp, $args){
        $list = get_stop_point_list($args['name']);
        $resp->getBody()->write(json_encode($list));
        $resp = $resp->withHeader('Content-Type','application/json');
        return $resp;
    }

    public function getBusstop($req, $resp, $args){
        $name = $args['name'];
        $stop = get_stop_point_ref_from_name($args['name']);
        $data = get_data_from_stop_point_ref($stop);
        $resp->getBody()->write(json_encode($data));
        $resp = $resp->withHeader('Content-Type','application/json');
        return $resp;
    }

    public function getLocation(Request $req, Response $resp, $args){
        $location = $args['savedLocation'];
        $busstopList = array();
        if ($location == 'uni-it'){
            array_push($busstopList, 'uni', 'resowi', 'unimensa');
        }
        $resp->getBody()->write(json_encode($busstopList));
        $resp = $resp->withHeader('Content-Type','application/json');
        return $resp;
    }

    public function getLocationList(Request $req, Response $resp, $args){
        $locationList = array('uni-it');
        $resp->getBody()->write(json_encode($locationList));
        $resp = $resp->withHeader('Content-Type','application/json');
        return $resp;
    }
}