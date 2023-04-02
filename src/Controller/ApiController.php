<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    public function index(): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
      
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'OK index 1'
        ]));
    }

    public function default(): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
      
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Hello !'
        ]));
    }
}
