<?php

namespace App\Controller;

use App\Entity\Feature;
use App\Entity\Page;
use App\Entity\Project;
use App\Entity\EntryPoint;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class FeatureController extends AbstractController
{

    public function createFeature(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->project);

        $feature = new Feature();
        $feature->setName($json->name)
            ->setDescription($json->description)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setSection($json->section)
            ->setStatus($json->status)
            ->setUid(Uuid::v1())
            ->setIsFromCore($project->isIsCore())
            ->setProject($project)
            ->setSource(null);
        
        if ($json->page) {
            $page = $em->getRepository(Page::class)->find($json->page);
            if ($page) {
                $feature->setPage($page);
            }
        }

        $em->persist($feature);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvelle feature créée avec succès',
        ]));
    }

    public function editFeature(Request $req, EntityManagerInterface $em, $id): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $feature = $em->getRepository(Feature::class)->find($id);

        if (count($json->connections) > 0) {
            // Faire une différence entre les connections existantes et les nouvelles
            foreach($feature->getEntryPoints() as $connection) {
                if (!in_array($connection->getId(), $json->connections)) {
                    $feature->removeEntryPoint($connection);
                }
            }
            foreach ($json->connections as $connectionId) {
                $connection = $em->getRepository(EntryPoint::class)->find($connectionId);
                $feature->addEntryPoint($connection);
            }
        }
        $feature->setName($json->name)
            ->setDescription($json->description)
            ->setStatus($json->status)
            ->setSection($json->section)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($feature);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Modification de la connexion ok',
        ]));
    }

    public function getFeatureDetails(Request $req, EntityManagerInterface $em, string $uid): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $feature = $em->getRepository(Feature::class)->findOneBy(['uid' => $uid]);
        if ($feature) {
            $content = $this->serializeFeature($feature);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeFeature($feature)
    {
        $connectionsFormated = [];
        foreach ($feature->getEntryPoints() as $connection) {
            $connectionsFormated[] = [
                'id' => $connection->getId(),
                'uid' => $connection->getUid(),
                'name' => $connection->getName(),
            ];
        }
        $specsFormated = [];
        foreach ($feature->getSpecs() as $spec) {
            $specsFormated[] = [
                'id' => $spec->getId(),
                'uid' => $spec->getUid(),
                'name' => $spec->getName(),
                'status' => $spec->getStatus(),
                'description' => $spec->getDescription()
            ];
        }
        return [
            'id' => $feature->getId(),
            'uid' => $feature->getUid(),
            'name' => $feature->getName(),
            'description' => $feature->getDescription(),
            'status' => $feature->getStatus(),
            'projectUid' => $feature->getProject()->getUid(),
            'projectName' => $feature->getProject()->getName(),
            'specs' => $specsFormated,
            'connections' => $connectionsFormated
        ];
    }
}