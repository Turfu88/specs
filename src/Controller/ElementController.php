<?php

namespace App\Controller;

use App\Entity\Element;
use App\Entity\Project;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class ElementController extends AbstractController
{

    public function createElement(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->project);

        $page = new Element();
        $page->setName($json->name)
            ->setComment($json->comment)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1())
            ->setIsFromCore($project->isIsCore())
            ->setProject($project)
            ->setSource(null);
        $em->persist($page);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvel élément créé avec succès',
        ]));
    }

    public function editElement(Request $req, EntityManagerInterface $em, $id): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $element = $em->getRepository(Element::class)->find($id);

        $element->setName($json->name)
            ->setComment($json->comment)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($element);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Modification de l\'élément ok',
        ]));
    }

    public function getElementDetails(Request $req, EntityManagerInterface $em, string $uid): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $element = $em->getRepository(Element::class)->findOneBy(['uid' => $uid]);
        if ($element) {
            $content = $this->serializeElement($element);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeElement($element)
    {
        $connectionsFormated = [];
        foreach ($element->getConnections() as $connection) {
            $connectionsFormated[] = [
                'id' => $connection->getId(),
                'name' => $connection->getName()
            ];
        }
        $specsFormated = [];
        foreach ($element->getSpecs() as $spec) {
            $specsFormated[] = [
                'id' => $spec->getId(),
                'name' => $spec->getName()
            ];
        }
        return [
            'id' => $element->getId(),
            'uid' => $element->getUid(),
            'name' => $element->getName(),
            'comment' => $element->getComment(),
            'projectUid' => $element->getProject()->getUid(),
            'projectName' => $element->getProject()->getName(),
            'connections' => $connectionsFormated,
            'specs' => $specsFormated
        ];
    }

    public function deleteElement(Request $req, EntityManagerInterface $em, $id): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $element = $em->getRepository(Element::class)->find($id);
        $em->remove($element);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Element supprimée',
        ]));
    }
}