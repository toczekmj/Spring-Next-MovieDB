package pl.interfejsygraficzne.controller;

import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.Rating;
import pl.interfejsygraficzne.Service.ActorService;
import pl.interfejsygraficzne.Service.MovieService;
import pl.interfejsygraficzne.Service.RatingService;

import java.util.List;

@RestController
public class MovieController {

    private final MovieService movieService;
    private final ActorService actorService;
    private final RatingService ratingService;

    public MovieController(MovieService service, ActorService actorService, RatingService ratingService) {
        this.movieService = service;
        this.actorService = actorService;
        this.ratingService = ratingService;
    }

    @PostMapping("/addmovie")
    public Movie addMovie(@RequestBody Movie user){
        return movieService.saveMovie(user);
    }

    @GetMapping("/getallmovies")
    public List<Movie> getAllMovies(){
        return movieService.getMovies();
    }

    @GetMapping("/getmoviebyid/{id}")
    public Movie findMovieById(@PathVariable Long id){
        return movieService.getMovieById(id);
    }

    @GetMapping("/getmoviebytitle/{name}")
    public List<Movie> findMoviesByFirstName(@PathVariable String name){
        return movieService.getMoviesByTitle(name);
    }

    @PutMapping("/updatemovie")
    public Movie updateMovie(@RequestBody Movie movie){
        return movieService.updateMovie(movie);
    }

    @DeleteMapping("/deletemovie/{id}")
    public String deleteUser(@PathVariable Long id){
        return movieService.deleteMovie(id);
    }


    @PutMapping("/movie/{movieid}/addactor/{actorid}")
    public Actor addActor(@PathVariable Long movieid, @PathVariable Long actorid) {
        return actorService.attachActorToMovie(movieid, actorid);
    }

    @PutMapping("/movie/{movieid}/removeactor/{actorid}")
    public void removeActor(@PathVariable Long movieid, @PathVariable Long actorid) {
        actorService.removeActor(movieid, actorid);
    }

    @GetMapping("/movie/{id}/getrating")
    public Rating getRatnig(@PathVariable Long id){
        return movieService.getCalculatedRating(id);
    }


    @PutMapping("/movie/{movieid}/addrating")
    public Movie addRating(@PathVariable Long movieid, @RequestBody Rating rating){
        return ratingService.addRating(movieid, rating);
    }



}
