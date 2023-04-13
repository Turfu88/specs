<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends AbstractController
{
    public function default(): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
      
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 404,
            'message' => 'Entry point not found'
        ]));
    }
}
