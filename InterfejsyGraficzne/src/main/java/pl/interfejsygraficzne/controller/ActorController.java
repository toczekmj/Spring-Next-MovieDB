package pl.interfejsygraficzne.controller;

import org.springframework.web.bind.annotation.RestController;
import pl.interfejsygraficzne.Service.ActorService;

@RestController
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }


}
