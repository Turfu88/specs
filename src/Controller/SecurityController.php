<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        $response = new Response();

        if ($this->getUser()) {
            return $this->redirectToRoute('target_path');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
        $response = new Response();
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'email' => $lastUsername, 
            'error' => $error
        ]));
    }

    /**
     * @Route("/api/logout", name="logout")
     */
    public function logout(): Response
    {
        $response = new Response();
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Logout ok', 
        ]));
    }
}
