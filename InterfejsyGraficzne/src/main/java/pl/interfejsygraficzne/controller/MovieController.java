package pl.interfejsygraficzne.controller;

import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Service.MovieService;

import java.util.List;

@RestController
public class MovieController {

    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    @PostMapping("/addmovie")
    public Movie addMovie(@RequestBody Movie user){
        return service.saveMovie(user);
    }

    @GetMapping("/getallmovies")
    public List<Movie> getAllMovies(){
        return service.getMovies();
    }

    @GetMapping("/getmoviebyid/{id}")
    public Movie findMovieById(@PathVariable Long id){
        return service.getMovieById(id);
    }

    @GetMapping("/getmoviebytitle/{name}")
    public List<Movie> findMoviesByFirstName(@PathVariable String name){
        return service.getMoviesByTitle(name);
    }

    @PutMapping("/updatemovie")
    public Movie updateMovie(@RequestBody Movie movie){
        return service.updateMovie(movie);
    }

    @DeleteMapping("/deletemovie/{id}")
    public String deleteUser(@PathVariable Long id){
        return service.deleteMovie(id);
    }

}
