<?php

namespace App\Controller;

use App\Entity\Invitation;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Security("is_granted('ROLE_ADMIN')")]
class InvitationController extends AbstractController
{
    private $mailer;

    public function __construct(MailerInterface $mailer){
        $this->mailer = $mailer;
    }

    public function createInvitation(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        // $validation = new Invitation();

        // $validation
        //     ->setEmail($json->email)
        //     ->setAreaUid($json->areaUid)
        //     ->setCreatedAt(new \DateTimeImmutable)
        //     ->setUid(Uuid::v1());

        // $em->persist($validation);
        // $em->flush();

        // $this->sendInvitationEmail($validation->getEmail(), $validation->getUid());
        $this->sendInvitationEmail($json->email, Uuid::v1());

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        return $response->setStatusCode(201)->setContent(json_encode([
            'code' => 201,
            'message' => 'Invitation créée',
        ]));
    }

    public function getInvitationDetails(Request $req, EntityManagerInterface $em, string $uid): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $invitation = $em->getRepository(Invitation::class)->findOneBy(['uid' => $uid]);
        if ($invitation) {
            $content = $this->serializeInvitation($invitation);
        } else {
            $content = null;
        }
        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'content' => $content,
        ]));
    }

    private function serializeInvitation($invitation)
    {
        return [
            'id' => $invitation->getId(),
            'areaUid' => $invitation->getAreaUid(),
            'email' => $invitation->getEmail(),
            'createdAt' => $invitation->getCreatedAt(),
        ];
    }

    public function removeInvitation(Request $req, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());

        $invitation = isset($json->id) ? $em->getRepository(Invitation::class)->find($json->id) : null;
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        // if (null === $invitation) {
        //     return $response->setStatusCode(400)->setContent(json_encode([
        //         'code' => 400,
        //         'message' => 'Bad request',
        //     ]));
        // }
        // if ($invitation->getUser()->getId() !== $json->userId) {
        //     return $response->setStatusCode(401)->setContent(json_encode([
        //         'code' => 401,
        //         'message' => 'Not authorized',
        //     ]));
        // }

        $em->remove($invitation);
        $em->flush();

        return $response->setStatusCode(202)->setContent(json_encode([
            'code' => 202,
            'message' => 'Invitation removed',
        ]));
    }

    private function sendInvitationEmail($recipient, $uid) {
        $email = (new TemplatedEmail())
        ->from($_ENV['MAIL_USERNAME'])
        ->to($recipient)
        ->subject($_ENV['APP_NAME'] . ' - Rejoignez mon espace')
        ->htmlTemplate('emails/invitationJoinArea.html.twig')
        ->context([
            'app_url_base' => 'http://127.0.0.1:8000/',
            'uid' => $uid
        ]);
        $this->mailer->send($email);
    }
}
