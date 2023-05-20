<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\User;
use App\Entity\Feedback;
use App\Entity\Connection;
use App\Entity\Spec;
use App\Entity\Page;
use App\Entity\Feature;
use App\Entity\Summary;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_USER')")]
class FeedbackController extends AbstractController
{
    public function createFeedback(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $project = $em->getRepository(Project::class)->find($json->projectId);
        $user = $em->getRepository(User::class)->find($json->userId);

        $feedback = new Feedback();
        $feedback->setContent($json->content)
            ->setToTreat($json->toTreat)
            ->setStatus($json->status)
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setUid(Uuid::v1())
            ->setProject($project)
            ->setUser($user);

        switch ($json->feedbackType) {
            case 'connection':
                $connection = $em->getRepository(Connection::class)->find($json->parentId);
                $feedback->setConnection($connection);
                break;
            case 'spec':
                $spec = $em->getRepository(Spec::class)->find($json->parentId);
                $feedback->setSpec($spec);
                break;
            case 'summary':
                $summary = $em->getRepository(Summary::class)->find($json->parentId);
                $feedback->setSummary($summary);
                break;
            case 'feature':
                $feature = $em->getRepository(Feature::class)->find($json->parentId);
                $feedback->setFeature($feature);
                break;
            case 'page':
                $page = $em->getRepository(Page::class)->find($json->parentId);
                $feedback->setPage($page);
                break;
            default:
                return $response->setStatusCode(400)->setContent(json_encode([
                    'code' => 400,
                    'message' => 'Feedback non créé. Type de feedback non reconnu.',
                ]));
        }

        $em->persist($feedback);
        $em->flush();

        return $response->setStatusCode(201)->setContent(json_encode([
            'code' => 201,
            'message' => 'Nouveau feedback créé avec succès',
        ]));
    }

    public function editFeedback(Request $req, EntityManagerInterface $em, $id): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $feedback = $em->getRepository(Feedback::class)->find($id);

        $feedback->setContent($json->content)
            ->setStatus($json->status)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($feedback);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Modification du feedback ok',
        ]));
    }

}