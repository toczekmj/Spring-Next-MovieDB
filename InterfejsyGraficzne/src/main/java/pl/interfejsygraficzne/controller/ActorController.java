package pl.interfejsygraficzne.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Service.ActorService;

@RestController
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @PostMapping("/newactor")
    public Actor newActor(@RequestBody Actor actor){
        return actorService.newActor(actor);
    }
}
