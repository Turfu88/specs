<?php

namespace App\Controller;

use App\Entity\Validation;
use App\Entity\User;
use App\Entity\Page;
use App\Entity\Feature;
use App\Entity\Spec;
use App\Entity\Connection;
use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class ValidationController extends AbstractController
{
    public function addValidation(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        
        $user = $em->getRepository(User::class)->find($json->userId);
        $project = $em->getRepository(Project::class)->find($json->projectId);

        $page = isset($json->pageId) ? $em->getRepository(Page::class)->find($json->pageId) : null;    
        $feature = isset($json->featureId) ? $em->getRepository(Feature::class)->find($json->featureId) : null;
        $spec = isset($json->specId) ? $em->getRepository(Spec::class)->find($json->specId) : null;
        $connection = isset($json->connectionId) ? $em->getRepository(Connection::class)->find($json->connectionId) : null;
        
        $validation = new Validation();

        $validation
            ->setType($json->type)
            ->setUser($user)
            ->setProject($project)
            ->setCreated(new \DateTimeImmutable)
            ->setPage($page)
            ->setConnection($connection)
            ->setFeature($feature)
            ->setSpec($spec);

        $em->persist($validation);
        $em->flush();

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        return $response->setStatusCode(201)->setContent(json_encode([
            'code' => 201,
            'message' => 'Validation ajoutée',
        ]));
    }
    
    public function removeValidation(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());

        $validation = isset($json->id) ? $em->getRepository(Validation::class)->find($json->id) : null;
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        if (null === $validation) {
            return $response->setStatusCode(400)->setContent(json_encode([
                'code' => 400,
                'message' => 'Bad request',
            ]));
        }
        if ($validation->getUser()->getId() !== $json->userId) {
            return $response->setStatusCode(401)->setContent(json_encode([
                'code' => 401,
                'message' => 'Not authorized',
            ]));
        }

        $em->remove($validation);
        $em->flush();

        
        return $response->setStatusCode(202)->setContent(json_encode([
            'code' => 202,
            'message' => 'Validation removed',
        ]));
    }
}