<?php

namespace App\Controller;

use App\Entity\Spec;
use App\Entity\Feature;
use App\Entity\Element;
use App\Entity\Project;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class SpecController extends AbstractController
{

    public function createSpec(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->project);
        $feature = $em->getRepository(Feature::class)->find($json->featureId);
        $spec = new Spec();

        if (count($json->elements) > 0) {
            foreach ($json->elements as $elementId) {
                $element = $em->getRepository(Element::class)->find($elementId);
                $spec->addElement($element);
            }
        }
        $spec->setName($json->name)
            ->setDescription($json->description)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setStatus($json->status)
            ->setUid(Uuid::v1())
            ->setIsFromCore($project->isIsCore())
            ->setProject($project)
            ->setFeature($feature)
            ->setSource(null);

        $em->persist($spec);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvelle spec créée avec succès',
        ]));
    }

    public function editSpec(Request $req, EntityManagerInterface $em, $id): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $spec = $em->getRepository(Spec::class)->find($id);

        if (count($json->elements) > 0) {
            // Faire une différence entre les éléments existants et les nouveaux
            foreach($spec->getElements() as $element) {
                if (!in_array($element->getId(), $json->elements)) {
                    $spec->removeElement($element);
                }
            }

            foreach ($json->elements as $elementId) {
                $element = $em->getRepository(Element::class)->find($elementId);
                $spec->addElement($element);
            }
        }
        $spec->setName($json->name)
            ->setDescription($json->description)
            ->setStatus($json->status)
            ->setUpdatedAt(new \DateTimeImmutable);

        $em->persist($spec);
        $em->flush();
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Modification de la connexion ok',
        ]));
    }

    public function getSpecDetails(Request $req, EntityManagerInterface $em, string $uid): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $spec = $em->getRepository(Spec::class)->findOneBy(['uid' => $uid]);
        if ($spec) {
            $content = $this->serializeSpec($spec);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeSpec($spec)
    {
      /* The commented out code is a loop that iterates through the specs associated with a feature and
      formats them into an array with specific properties (id, uid, name, status, description).
      However, it is not being used in the current implementation of the `serializeSpec` method. */
        $elementsFormated = [];
        foreach ($spec->getElements() as $element) {
            $elementsFormated[] = [
                'id' => $element->getId(),
                'uid' => $element->getUid(),
                'name' => $element->getName(),
            ];
        }
        $validationsFormated = [];
        foreach ($spec->getValidations() as $validation) {
            $validationsFormated[] = [
                'id' => $validation->getId(),
                'created' => $validation->getCreated(),
                'username' => $validation->getUser()->getUsername(),
                'userId' => $validation->getUser()->getId(),
                'type' => $validation->getType()
            ];
        }
        $feedbacksFormated = [];
        foreach ($spec->getFeedback() as $feedback) {
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
            'id' => $spec->getId(),
            'uid' => $spec->getUid(),
            'name' => $spec->getName(),
            'description' => $spec->getDescription(),
            'status' => $spec->getStatus(),
            'featureUid' => $spec->getFeature()->getUid(),
            'featureName' => $spec->getFeature()->getName(),
            'projectUid' => $spec->getFeature()->getProject()->getUid(),
            'projectId' => $spec->getFeature()->getProject()->getId(),
            'projectName' => $spec->getFeature()->getProject()->getName(),
            'elements' => $elementsFormated,
            'validations' => $validationsFormated,
            'validators' => $spec->getProject()->getValidators(),
            'feedbacks' => $feedbacksFormated
        ];
    }

    public function deleteSpec(Request $req, EntityManagerInterface $em, $id): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $spec = $em->getRepository(Spec::class)->find($id);
        foreach($spec->getElements() as $element) {
            $spec->removeElement($element);    
        }
        $em->remove($spec);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Spec supprimée',
        ]));
    }
}