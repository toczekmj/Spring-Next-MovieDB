package pl.interfejsygraficzne.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Service.ActorService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @Operation(summary = "add new actor to the database")
    @PostMapping("/actors")
    @ResponseStatus(HttpStatus.CREATED)
    public Actor newActor(@Valid @RequestBody Actor actor){
        return actorService.saveActor(actor);
    }

    @Operation(summary = "get all available actor that are currently in the database")
    @GetMapping("/actors")
    public List<Actor> getAllActors(){
        return actorService.getAllActors();
    }
}
