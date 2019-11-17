<?php
require __DIR__ . '/../src/utils.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Gvb\Views;

require __DIR__ . '/../vendor/autoload.php';


$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write(''.
    "Available Methods:\n".
    "/list-stops\n".
    "/buststop/{name}\n");
    $response = $response->withHeader('Content-Type','text/plain');
    return $response;
});

$app->get('/list-stops', [Views::class, 'getListStops']);
$app->get('/busstop/{name}', [Views::class, 'getBusstop']);
$app->get('/location', [Views::class, 'getLocationList']);
$app->get('/location/{savedLocation}', [Views::class, 'getLocation']);

$app->run();