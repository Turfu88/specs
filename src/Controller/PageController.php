<?php

namespace App\Controller;

use App\Entity\Page;
use App\Entity\Project;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class PageController extends AbstractController
{

    public function createPage(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->project);

        $page = new Page();
        $page->setName($json->name)
            ->setComment($json->comment)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1())
            ->setIsFromCore($project->isIsCore())
            ->setProject($project)
            ->setIsModelOk($json->isModelOk)
            ->setIsPrivate($json->isPrivate)
            ->setSource(null);
        $em->persist($page);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvelle page créée avec succès',
        ]));
    }

    public function getPageDetails(Request $req, EntityManagerInterface $em, string $uid): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $page = $em->getRepository(Page::class)->findOneBy(['uid' => $uid]);
        if ($page) {
            $content = $this->serializePage($page);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializePage($page)
    {
        $featuresFormated = [];
        foreach ($page->getFeatures() as $feature) {
            $featuresFormated[] = [
                'id' => $feature->getId(),
                'uid' => $feature->getUid(),
                'name' => $feature->getName(),
                'status' => $feature->getStatus()
            ];
        }
        return [
            'id' => $page->getId(),
            'uid' => $page->getUid(),
            'name' => $page->getName(),
            'status' => $page->getStatus(),
            'projectUid' => $page->getProject()->getUid(),
            'projectName' => $page->getProject()->getName(),
            'features' => $featuresFormated
        ];
    }
}