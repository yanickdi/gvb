<?php
require __DIR__ . '/../src/utils.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Gvb\Views;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->addRoutingMiddleware();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    // TODO: Only allow cors from production server
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Content-Type','application/json');
});

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
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
    throw new HttpNotFoundException($request);
});


// TODO: Add a debug switch here and do not add errors in production
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->run();