package pl.interfejsygraficzne.controller;

import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Model.Comment;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.Rating;
import pl.interfejsygraficzne.Service.ActorService;
import pl.interfejsygraficzne.Service.MovieService;
import pl.interfejsygraficzne.Service.RatingService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MovieController {

    private final MovieService movieService;
    private final ActorService actorService;
    private final RatingService ratingService;
    public MovieController(MovieService service, ActorService actorService, RatingService ratingService) {
        this.movieService = service;
        this.actorService = actorService;
        this.ratingService = ratingService;
    }

    @PostMapping("/movies/add")
    public Movie addMovie(@RequestBody Movie user){
        return movieService.saveMovie(user);
    }

    @GetMapping("/movies/get/all")
    public List<Movie> getAllMovies(){
        return movieService.getMovies();
    }

    @GetMapping("/movies/get/byid/{id}")
    public Movie findMovieById(@PathVariable Long id){
        return movieService.getMovieById(id);
    }

    @GetMapping("/movies/get/byname/{name}")
    public List<Movie> findMoviesByFirstName(@PathVariable String name){
        return movieService.getMoviesByTitle(name);
    }

    @PutMapping("/movies/updatemovie")
    public Movie updateMovie(@RequestBody Movie movie){
        return movieService.updateMovie(movie);
    }

    @DeleteMapping("/movies/delete/byid/{id}")
    public String deleteMovie(@PathVariable Long id){
        return movieService.deleteMovie(id);
    }


    @PutMapping("/movies/byid/{movieid}/actors/delete/byid/{actorid}")
    public Actor addActor(@PathVariable Long movieid, @PathVariable Long actorid) {
        return actorService.attachActorToMovie(movieid, actorid);
    }

    @DeleteMapping("/movies/byid/{movieid}/actors/delete/byid/{actorid}")
    public void removeActor(@PathVariable Long movieid, @PathVariable Long actorid) {
        actorService.removeActor(movieid, actorid);
    }

    @GetMapping("/movies/get/rating/{movieid}")
    public Rating getRating(@PathVariable Long movieid){
        return movieService.getCalculatedRating(movieid);
    }

    @PutMapping("/movies/{movieid}/rating")
    public Movie addRating(@PathVariable Long movieid, @RequestBody Rating rating){
        return ratingService.addRating(movieid, rating);
    }

    @GetMapping("/movies/get/comments/{movieid}")
    public List<Comment> getMovieComments(@PathVariable Long movieid){
        Movie movie = movieService.getMovieById(movieid);
        return movie.getComments();
    }



}
