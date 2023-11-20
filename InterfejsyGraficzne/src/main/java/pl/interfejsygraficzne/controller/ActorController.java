package pl.interfejsygraficzne.controller;

import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Service.ActorService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @PostMapping("/actors/new")
    public Actor newActor(@RequestBody Actor actor){
        return actorService.newActor(actor);
    }

    @GetMapping("/actors/get/all")
    public List<Actor> getAllActors(){
        return actorService.getAllActors();
    }
}
