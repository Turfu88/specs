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

    public function getUserPages(Request $req, EntityManagerInterface $em): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $user = $em->getRepository(User::class)->find($req->headers->all()["userid"][0]);
        if ($user) {
            $content = $this->serializePagesFromUser($user);
        } else {
            $content = null;
        }

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializePagesFromUser($user) {
        $pagesFormated = [];
        $pageIds = [];
        foreach ($user->getAreas() as $area) {
            foreach ($area->getProjects() as $project) {
                foreach ($project->getPages() as $page) {
                    if (!in_array($page->getId(), $pageIds)) {
                        $pageIds[] = $page->getId();
                        $pagesFormated[] = [
                            'id' => $page->getId(),
                            'uid' => $page->getUid(),
                            'name' => $page->getName(),
                            'status' => $page->getStatus(),
                            'isCore' => $page->isIsFromCore(),
                            'comment' => $page->getComment(),
                            'category' => $page->getCategory(),
                            'modelUrl' => $page->getModelUrl(),
                            'isPrivate' => $page->isIsPrivate(),
                            'createdAt' => $project->getCreatedAt(),
                            'updatedAt' => $project->getUpdatedAt(),
                            'project' => $project->getName(),
                            'isProjectCore' => $project->isIsCore()
                        ];
                    }
                }   
            }
        }
        return $pagesFormated;
    }
    
    public function getUserFeatures(Request $req, EntityManagerInterface $em): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $user = $em->getRepository(User::class)->find($req->headers->all()["userid"][0]);
        if ($user) {
            $content = $this->serializeFeaturesFromUser($user);
        } else {
            $content = null;
        }

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeFeaturesFromUser($user) {
        $featureFormated = [];
        $featureIds = [];
        foreach ($user->getAreas() as $area) {
            foreach ($area->getProjects() as $project) {
                foreach ($project->getFeatures() as $feature) {
                    if (!in_array($feature->getId(), $featureIds)) {
                        $featureIds[] = $feature->getId();
                        $featureFormated[] = [
                            'id' => $feature->getId(),
                            'uid' => $feature->getUid(),
                            'name' => $feature->getName(),
                            'status' => $feature->getStatus(),
                            'isCore' => $feature->isIsFromCore(),
                            'description' => $feature->getDescription(),
                            'section' => $feature->getSection(),
                            'createdAt' => $project->getCreatedAt(),
                            'updatedAt' => $project->getUpdatedAt(),
                            'project' => $project->getName(),
                            'isProjectCore' => $project->isIsCore()
                        ];
                    }
                }   
            }
        }
        return $featureFormated;
    }

    public function getUserSpecs(Request $req, EntityManagerInterface $em): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $user = $em->getRepository(User::class)->find($req->headers->all()["userid"][0]);
        if ($user) {
            $content = $this->serializeSpecsFromUser($user);
        } else {
            $content = null;
        }
        dump($user);
        dump($content);
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeSpecsFromUser($user) {
        $specsFormated = [];
        $specIds = [];
        foreach ($user->getAreas() as $area) {
            foreach ($area->getProjects() as $project) {
                foreach ($project->getSpecs() as $spec) {
                    if (!in_array($spec->getId(), $specIds)) {
                        $specIds[] = $spec->getId();
                        $specsFormated[] = [
                            'id' => $spec->getId(),
                            'uid' => $spec->getUid(),
                            'name' => $spec->getName(),
                            'status' => $spec->getStatus(),
                            'isCore' => $spec->isIsFromCore(),
                            'description' => $spec->getDescription(),
                            'createdAt' => $project->getCreatedAt(),
                            'updatedAt' => $project->getUpdatedAt(),
                            'project' => $project->getName(),
                            'isProjectCore' => $project->isIsCore()
                        ];
                    }
                }   
            }
        }
        return $specsFormated;
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