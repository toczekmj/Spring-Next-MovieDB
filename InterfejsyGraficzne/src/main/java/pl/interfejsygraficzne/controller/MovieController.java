package pl.interfejsygraficzne.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
@CrossOrigin
public class MovieController {

    private final MovieService movieService;
    private final ActorService actorService;
    private final RatingService ratingService;
    public MovieController(MovieService service, ActorService actorService, RatingService ratingService) {
        this.movieService = service;
        this.actorService = actorService;
        this.ratingService = ratingService;
    }

    @Operation(summary = "add movie to the database")
    @PostMapping("/movies")
    @ResponseStatus(HttpStatus.CREATED)
    public Movie addMovie(@Valid @RequestBody Movie movie){
        return movieService.saveMovie(movie);
    }

    @Operation(summary = "get all movies from the database")
    @GetMapping("/movies")
    public List<Movie> getAllMovies(){
        return movieService.getMovies();
    }

    @Operation(summary = "get movie information by id")
    @GetMapping("/movies/{id}")
    public Movie findMovieById(@PathVariable Long id){
        return movieService.getMovieById(id);
    }

    @Operation(summary = "get list of movies containing a phrase in title")
    @GetMapping("/movies/title/{name}")
    public List<Movie> findMoviesByFirstName(@PathVariable String name){
        return movieService.getMoviesByTitle(name);
    }

    @Operation(summary = "update movie information in database")
    @PutMapping("/movies")
    public Movie updateMovie(@Valid @RequestBody Movie movie){
        return movieService.updateMovie(movie);
    }

    @Operation(summary = "delete movie from database by id")
    @DeleteMapping("/movies/{id}")
    public String deleteMovie(@PathVariable Long id){
        return movieService.deleteMovie(id);
    }

    @Operation(summary = "add actor to movie")
    @PutMapping("/movies/{movieid}/actors/{actorid}")
    public Actor addActor(@PathVariable Long movieid, @PathVariable Long actorid) {
        return actorService.attachActorToMovie(movieid, actorid);
    }

    @Operation(summary = "remove actor from movie")
    @DeleteMapping("/movies/{movieid}/actors/{actorid}")
    public void removeActor(@PathVariable Long movieid, @PathVariable Long actorid) {
        actorService.removeActor(movieid, actorid);
    }

    @Operation(summary = "get movie rating")
    @GetMapping("/movies/{id}/ratings")
    public Rating getRating(@PathVariable Long id){
        return movieService.getCalculatedRating(id);
    }

    @Operation(summary = "add rating to the movie")
    @PutMapping("/movies/{id}/ratings")
    public Movie addRating(@PathVariable Long id, @Valid @RequestBody Rating rating){
        return ratingService.addRating(id, rating);
    }

    @Operation(summary = "get all comments from the movie")
    @GetMapping("/movies/{id}/comments")
    public List<Comment> getMovieComments(@PathVariable Long id){
        Movie movie = movieService.getMovieById(id);
        return movie.getComments();
    }

}
