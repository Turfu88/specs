<?php

namespace App\Controller;

use App\Entity\Page;
use App\Entity\Account;
use App\Entity\Element;
use App\Entity\Project;
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

        // $account = new Account();
        // $account->setName($json->accountName)
        //     ->setUid(Uuid::v1())
        //     ->setCreatedAt(new \DateTimeImmutable)
        //     ->setUpdatedAt(new \DateTimeImmutable);
        // $em->persist($account);

    
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvel utilisateur créé avec succès',
        ]));
    }

    public function createCore(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        $account = $em->getRepository(Account::class)->find($json->account);

        $project = new Project();
        $project->setName($json->form->name)
            ->setVersion($json->form->version)
            ->setComment($json->form->comment)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1())
            ->setIsCore(true)
            ->setSource(null)
            ->setAccount($account);
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
        $account = $em->getRepository(Account::class)->find($req->headers->all()["accountid"][0]);
        if ($account) {
            $projects = $account->getProjects();
            $content = $this->serializeForProjects($projects);
        } else {
            $content = null;
        }
        // dump($account);
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
        $project = $em->getRepository(Project::class)->findOneBy(['uid' => $uid]);
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
        return [
            'id' => $project->getId(),
            'uid' => $project->getUid(),
            'name' => $project->getName(),
            'isCore' => $project->isIsCore(),
            'status' => $project->getStatus(),
            'statusChoices' => $project->getStatusChoices(),
            'statusColors' => $project->getStatusColors(),
            'pages' => $pagesFormated
        ];        
    }

    public function updateStatus(Request $req, EntityManagerInterface $em): Response {
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
}
