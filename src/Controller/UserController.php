<?php

namespace App\Controller;

use App\Entity\Area;
use App\Entity\User;
// use App\Service\model\UserModel;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;

class UserController extends AbstractController
{
    public function createAccount(Request $req, UserPasswordHasherInterface $encoder, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        $area = new Area();
        $area->setName($json->areaName)
            ->setUid(Uuid::v1())
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($area);

        $user = new User();
        $user->setUsername($json->username)
            ->setFirstname($json->firstname)
            ->setLastname($json->lastname)
            ->setEmail($json->email)
            ->setCompany($json->company)
            ->setRoles(['ROLE_USER,ROLE_ADMIN'])
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setPassword($json->password)
            ->addArea($area);

        $hash = $encoder->hashPassword($user, $user->getPassword());
        $user->setPassword($hash);
        $em->persist($user);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvel utilisateur créé avec succès',
        ]));
    }

    public function getUserAreas(Request $req, EntityManagerInterface $em): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $user = $em->getRepository(User::class)->find($req->headers->all()["userid"][0]);
        if ($user) {
            $areas = $user->getAreas();
            $content = $this->serializeForAreas($areas);
        } else {
            $content = null;
        }

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeForAreas($areas)
    {
        $areasFormated = [];
        foreach ($areas as $area) {
            $projectsFormated = [];
            foreach ($area->getProjects() as $project) {
                $projectsFormated[] = [
                    'id' => $project->getId(),
                    'uid' => $project->getUid(),
                    'name' => $project->getName(),
                    'isCore' => $project->isIsCore(),
                    'status' => $project->getStatus(),
                    'createdAt' => $project->getCreatedAt(),
                    'updatedAt' => $project->getUpdatedAt()
                ];
            }
            $areasFormated[] = [
                'id' => $area->getId(),
                'uid' => $area->getUid(),
                'name' => $area->getName(),
                'projects' => $projectsFormated
            ];
        }

        return $areasFormated;
    }
}