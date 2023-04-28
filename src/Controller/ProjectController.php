<?php

namespace App\Controller;

use App\Entity\Page;
use App\Entity\Area;
use App\Entity\Element;
use App\Entity\Project;
use App\Entity\User;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class ProjectController extends AbstractController
{
    public function createProject(Request $req, EntityManagerInterface $em): Response
    {
        // @TODO: A terminer

        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        // $area = new Area();
        // $area->setName($json->areaName)
        //     ->setUid(Uuid::v1())
        //     ->setCreatedAt(new \DateTimeImmutable)
        //     ->setUpdatedAt(new \DateTimeImmutable);
        // $em->persist($area);


        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvel utilisateur créé avec succès',
        ]));
    }

    public function updateProject(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        $project = $em->getRepository(Project::class)->find($json->projectId);
        $project->setName($json->name)
            ->setVersion($json->version)
            ->setPreviousVersion($json->previousVersion)
            ->setComment($json->comment)
            ->setStatus($json->status)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($project);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Projet modifié avec succès',
        ]));
    }

    public function createCore(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $user = $em->getRepository(User::class)->find($req->headers->all()["userid"][0]);
        
        $project = new Project();
        // Ajouter les espaces choisis
        if ($json->areas) {
            $areaSelected = [];
            foreach ($json->areas as $area) {
                if ($area->choosed) {
                    $areaSelected[] = $area->id;
                }
            }
            foreach ($user->getAreas() as $area) {
                if (in_array($area->getId(), $areaSelected)) {
                    $project->addArea($area);
                }
            }
        }
        $project->setName($json->form->name)
            ->setVersion($json->form->version)
            ->setComment($json->form->comment)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1())
            ->setIsCore(true)
            ->setSource(null);
        $em->persist($project);

        foreach ($json->pages as $page) {
            if (!$page->choosed) {
                continue;
            }
            $pageNew = new Page();
            $pageNew->setName($page->name)
                ->setUid(Uuid::v1())
                ->setCategory($page->category)
                ->setCreatedAt(new \DateTimeImmutable)
                ->setUpdatedAt(new \DateTimeImmutable)
                ->setIsFromCore(true)
                ->setIsPrivate($page->private)
                ->setSource(null)
                ->setIsModelOk(true)
                ->setProject($project);
            $em->persist($pageNew);
        }

        foreach ($json->elements as $element) {
            if (!$element->choosed) {
                continue;
            }
            $elementNew = new Element();
            $elementNew->setName($element->name)
                ->setUid(Uuid::v1())
                ->setCreatedAt(new \DateTimeImmutable)
                ->setUpdatedAt(new \DateTimeImmutable)
                ->setIsFromCore(true)
                ->setSource(null)
                ->setProject($project);
            $em->persist($elementNew);
        }
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Coeur créé avec succès',
        ]));
    }

    public function getAll(Request $req, EntityManagerInterface $em): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $area = $em->getRepository(Area::class)->find($req->headers->all()["areaid"][0]);
        if ($area) {
            $projects = $area->getProjects();
            $content = $this->serializeForProjects($projects);
        } else {
            $content = null;
        }
        // dump($area);
        // dump($projects);
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeForProjects($projects)
    {
        $projectsFormated = [];
        foreach ($projects as $project) {
            $projectsFormated[] = [
                'id' => $project->getId(),
                'uid' => $project->getUid(),
                'name' => $project->getName(),
                'isCore' => $project->isIsCore(),
                'status' => $project->getStatus()
            ];
        }

        return $projectsFormated;
    }

    public function getProjectInfo(Request $req, EntityManagerInterface $em, string $uid): Response
    {

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        if (strlen($uid) > 10) {
            $project = $em->getRepository(Project::class)->findOneBy(['uid' => $uid]);
        } else {
            $project = $em->getRepository(Project::class)->find($uid);
        }
        if ($project) {
            $content = $this->serializeProject($project);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeProject($project)
    {
        $pagesFormated = [];
        foreach ($project->getPages() as $page) {
            $pagesFormated[] = [
                'id' => $page->getId(),
                'uid' => $page->getUid(),
                'name' => $page->getName(),
                'status' => $page->getStatus(),
                'category' => $page->getCategory()
            ];
        }
        $elementsFormated = [];
        foreach ($project->getElements() as $element) {
            $elementsFormated[] = [
                'id' => $element->getId(),
                'uid' => $element->getUid(),
                'name' => $element->getName(),
                'comment' => $page->getComment()
            ];
        }
        $connectionsFormated = [];
        foreach ($project->getConnections() as $connection) {
            $connectionsFormated[] = [
                'id' => $connection->getId(),
                'uid' => $connection->getUid(),
                'name' => $connection->getName(),
                'code' => $connection->getCode(),
                'description' => $connection->getDescription(),
                'status' => $connection->getStatus(),
                'isFromCore' => $connection->isIsFromCore(),
                'url' => $connection->getStatus()
            ];
        }
        $featuresFormated = [];
        foreach ($project->getFeatures() as $feature) {
            $featuresFormated[] = [
                'id' => $feature->getId(),
                'uid' => $feature->getUid(),
                'name' => $feature->getName(),
                'status' => $feature->getStatus(),
                'hasPage' => $feature->getPage() ? true : false
            ];
        }

        return [
            'id' => $project->getId(),
            'uid' => $project->getUid(),
            'name' => $project->getName(),
            'version' => $project->getVersion(),
            'previousVersion' => $project->getPreviousVersion(),
            'comment' => $project->getComment(),
            'isCore' => $project->isIsCore(),
            'status' => $project->getStatus(),
            'statusChoices' => $project->getStatusChoices(),
            'statusColors' => $project->getStatusColors(),
            'sectionChoices' => $project->getSectionChoices(),
            'elements' => $elementsFormated,
            'pages' => $pagesFormated,
            'connections' => $connectionsFormated,
            'features' => $featuresFormated
        ];
    }

    public function updateStatus(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->projectId);
        $project->setStatusChoices($json->statusChoices)
            ->setStatusColors($json->statusColors)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($project);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Status mis à jour',
        ]));
    }
    public function updateSection(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->projectId);
        $project->setSectionChoices($json->sectionChoices)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($project);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Status mis à jour',
        ]));
    }

}