<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class JWTSubscriber implements EventSubscriberInterface
{

    public function onLexikJwtAuthenticationOnJwtCreated(JWTCreatedEvent $event)
    {
        $data = $event->getData();
        $data['userId'] = $event->getUser()->getId();
        $data['userEmail'] = $event->getUser()->getEmail();
        // $data['areaId'] = $event->getUser()->getArea()->getId();
        $event->setData($data);
    }

    public static function getSubscribedEvents()
    {
        return [
            'lexik_jwt_authentication.on_jwt_created' => 'onLexikJwtAuthenticationOnJwtCreated',
        ];
    }
}
