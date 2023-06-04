<?php

namespace App\Controller;

use App\Entity\Area;
use App\Entity\Project;
use App\Entity\User;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class AreaController extends AbstractController
{
    public function createArea(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        $area = new Area();
        $area->setName($json->name)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1());
        $em->persist($area);

        foreach ($json->selectedProjects as $projectId) {
            $project = $em->getRepository(Project::class)->find($projectId);
            $area->addProject($project);
        }

        $user = $em->getRepository(User::class)->find($json->userId);
        $area->addUser($user);


        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvel espace créé avec succès',
        ]));
    }

    public function editArea(Request $req, EntityManagerInterface $em, $id): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $area = $em->getRepository(Area::class)->find($id);

        // if (count($json->elements) > 0) {
        //     // Faire une différence entre les éléments existants et les nouveaux
        //     foreach($connection->getElements() as $element) {
        //         if (!in_array($element->getId(), $json->elements)) {
        //             $connection->removeElement($element);
        //         }
        //     }

        //     foreach ($json->elements as $elementId) {
        //         $element = $em->getRepository(Element::class)->find($elementId);
        //         $connection->addElement($element);
        //     }
        // }
        $area->setName($json->name)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($area);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Modification de l\'espace ok',
        ]));
    }

    public function getAreaDetails(Request $req, EntityManagerInterface $em, string $uid): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $area = $em->getRepository(Area::class)->findOneBy(['uid' => $uid]);
        if ($area) {
            $content = $this->serializeArea($area);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeArea($area)
    {
        $usersFormated = [];
        foreach ($area->getUsers() as $user) {
            $usersFormated[] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'company' => $user->getCompany(),
                'email' => $user->getEmail(),
            ];
        }
        $projectsFormated = [];
        foreach ($area->getProjects() as $project) {
            $projectsFormated[] = [
                'id' => $project->getId(),
                'uid' => $project->getUid(),
                'name' => $project->getName(),
                'status' => $project->getStatus(),
                'createdAt' => $project->getCreatedAt(),
                'updatedAt' => $project->getUpdatedAt()
            ];
        }
        return [
            'id' => $area->getId(),
            'uid' => $area->getUid(),
            'name' => $area->getName(),
            'users' => $usersFormated,
            'projects' => $projectsFormated
        ];
    }
}