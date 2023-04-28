<?php

namespace App\Controller;

use App\Entity\Connection;
use App\Entity\Project;
use App\Entity\Element;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class ConnectionController extends AbstractController
{
    public function createConnection(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->project);

        $connection = new Connection();
        $connection->setName($json->name)
            ->setDescription($json->description)
            ->setUrl($json->url)
            ->setCode($json->code)
            ->setStatus($json->status)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1())
            ->setIsFromCore($project->isIsCore())
            ->setProject($project)
            ->setSource(null);
        $em->persist($connection);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvelle connexion créé avec succès',
        ]));
    }

    public function editConnection(Request $req, EntityManagerInterface $em, $id): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $connection = $em->getRepository(Connection::class)->find($id);

        if (count($json->elements) > 0) {
            // Faire une différence entre les éléments existants et les nouveaux
            foreach($connection->getElements() as $element) {
                if (!in_array($element->getId(), $json->elements)) {
                    $connection->removeElement($element);
                }
            }
            foreach ($json->elements as $elementId) {
                $element = $em->getRepository(Element::class)->find($elementId);
                $connection->addElement($element);
            }
        }
        $connection->setName($json->name)
            ->setDescription($json->description)
            ->setUrl($json->url)
            ->setCode($json->code)
            ->setStatus($json->status)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($connection);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Modification de la connexion ok',
        ]));
    }

    public function getConnectionDetails(Request $req, EntityManagerInterface $em, string $uid): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $connection = $em->getRepository(Connection::class)->findOneBy(['uid' => $uid]);
        if ($connection) {
            $content = $this->serializeConnection($connection);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeConnection($connection)
    {
        $elementsFormated = [];
        foreach ($connection->getElements() as $element) {
            $elementsFormated[] = [
                'id' => $element->getId(),
                'uid' => $element->getUid(),
                'name' => $element->getName(),
            ];
        }
        $feedbacksFormated = [];
        foreach ($connection->getFeedbacks() as $feedback) {
            $feedbacksFormated[] = [
                'id' => $feedback->getId(),
                'uid' => $feedback->getUid(),
                'content' => $feedback->getContent(),
                'status' => $feedback->getStatus(),
                'toTreat' => $feedback->isToTreat(),
                'username' => $feedback->getUser()->getUsername(),
                'createdAt' => $feedback->getCreatedAt(),
                'updatedAt' => $feedback->getUpdatedAt(),
                'hasBeenModified' => $feedback->getCreatedAt() === $feedback->getUpdatedAt(),
                'userId' => $feedback->getUser()->getId()
            ];
        }
        return [
            'id' => $connection->getId(),
            'uid' => $connection->getUid(),
            'name' => $connection->getName(),
            'description' => $connection->getDescription(),
            'code' => $connection->getCode(),
            'url' => $connection->getUrl(),
            'status' => $connection->getStatus(),
            'isFromCore' => $connection->isIsFromCore(),
            'projectId' => $connection->getProject()->getId(),
            'projectUid' => $connection->getProject()->getUid(),
            'projectName' => $connection->getProject()->getName(),
            'elements' => $elementsFormated,
            'feedbacks' => $feedbacksFormated
        ];
    }
}