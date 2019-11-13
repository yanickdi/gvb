<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../app/utils.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write(''.
    "Available Methods:\n".
    "/list-stops\n".
    "/buststop/{name}\n");
    $response = $response->withHeader('Content-Type','text/plain');
    return $response;
});

$app->get('/list-stops', function (Request $request, Response $response, array $args) {
    $list = get_stop_point_list($args['name']);
    $response->getBody()->write(json_encode($list));
    $response = $response->withHeader('Content-Type','application/json');
    return $response;
});

$app->get('/busstop/{name}', function (Request $request, Response $response, array $args) {
    $stop = get_stop_point_ref_from_name($args['name']);
    $data = get_data_from_stop_point_ref($stop);
    $response->getBody()->write(json_encode($data));
    $response = $response->withHeader('Content-Type','application/json');
    return $response;
});

$app->run();