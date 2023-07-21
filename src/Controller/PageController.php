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
            ->setStatus($json->status)
            ->setCategory($json->category)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1())
            ->setIsFromCore($project->isIsCore())
            ->setProject($project)
            ->setIsModelOk($json->isModelOk)
            ->setModelUrl($json->modelUrl)
            ->setIsPrivate($json->isPrivate)
            ->setSource(null);
        $em->persist($page);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvelle page créée avec succès',
        ]));
    }

    public function editPage(Request $req, EntityManagerInterface $em, $id): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $page = $em->getRepository(Page::class)->find($id);

        $page->setName($json->name)
            ->setComment($json->comment)
            ->setCategory($json->category)
            ->setStatus($json->status)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setIsModelOk($json->isModelOk)
            ->setModelUrl($json->modelUrl)
            ->setIsPrivate($json->isPrivate);
        $em->persist($page);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Modification de la page ok',
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
            $specsFormated = [];
            foreach ($feature->getSpecs() as $spec) {
                $specsFormated[] = [
                    'id' => $spec->getId(),
                    'uid' => $spec->getUid(),
                    'name' => $spec->getName(),
                    'status' => $spec->getStatus()
                ];
            }
            $featuresFormated[] = [
                'id' => $feature->getId(),
                'uid' => $feature->getUid(),
                'name' => $feature->getName(),
                'status' => $feature->getStatus(),
                'specs' => $specsFormated
            ];
        }
        $validationsFormated = [];
        foreach ($page->getValidations() as $validation) {
            $validationsFormated[] = [
                'id' => $validation->getId(),
                'created' => $validation->getCreated(),
                'username' => $validation->getUser()->getUsername(),
                'userId' => $validation->getUser()->getId(),
                'type' => $validation->getType()
            ];
        }
        $feedbacksFormated = [];
        foreach ($page->getFeedback() as $feedback) {
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
            'id' => $page->getId(),
            'uid' => $page->getUid(),
            'name' => $page->getName(),
            'comment' => $page->getComment(),
            'category' => $page->getCategory(),
            'status' => $page->getStatus(),
            'projectUid' => $page->getProject()->getUid(),
            'projectId' => $page->getProject()->getId(),
            'projectName' => $page->getProject()->getName(),
            'isModelOk' => $page->isIsModelOk(),
            'modelUrl' => $page->getModelUrl(),
            'isPrivate' => $page->isIsPrivate(),
            'features' => $featuresFormated,
            'validations' => $validationsFormated,
            'validators' => $page->getProject()->getValidators(),
            'feedbacks' => $feedbacksFormated
        ];
    }

    public function deletePage(Request $req, EntityManagerInterface $em, $id): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $page = $em->getRepository(Page::class)->find($id);
        foreach($page->getFeatures() as $feature) {
            foreach ($feature->getSpecs() as $spec) {
                foreach ($spec->getElements() as $element) {
                    $spec->removeElement($element);
                }
                $em->remove($spec);
            }
            $em->remove($feature);    
        }
        $em->remove($page);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Page supprimée',
        ]));
    }
}
