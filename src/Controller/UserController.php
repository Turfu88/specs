<?php

namespace App\Controller;

use App\Entity\Account;
use App\Entity\User;
// use App\Service\model\UserModel;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;

class UserController extends AbstractController
{
    public function createAccount(Request $req, UserPasswordHasherInterface $encoder, EntityManagerInterface $em): Response
    {
        $json = json_decode($req->getContent());
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        
        $account = new Account();
        $account->setName($json->accountName)
            ->setUid(Uuid::v1())
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable);
        $em->persist($account);

        $user = new User();
        $user->setUsername($json->username)
            ->setFirstname($json->firstname)
            ->setLastname($json->lastname)
            ->setEmail($json->email)
            ->setCompany($json->company)
            ->setRoles(['ROLE_USER,ROLE_ADMIN'])
            ->setCreatedAt(new \DateTimeImmutable)
            ->setUpdatedAt(new \DateTimeImmutable)
            ->setPassword($json->password)
            ->setAccount($account);

        $hash = $encoder->hashPassword($user, $user->getPassword());
        $user->setPassword($hash);
        $em->persist($user);
        $em->flush();

        return $response->setStatusCode(200)->setContent(json_encode([
            'code' => 200,
            'message' => 'Nouvel utilisateur créé avec succès',
        ]));
    }
}