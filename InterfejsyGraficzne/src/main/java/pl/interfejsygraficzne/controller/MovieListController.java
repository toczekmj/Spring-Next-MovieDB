package pl.interfejsygraficzne.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.MovieList;
import pl.interfejsygraficzne.Model.MovieListRequest;
import pl.interfejsygraficzne.Service.MovieListService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin
public class MovieListController {

    private final MovieListService movieListService;

    @Operation(summary = "add movie list")
    @PostMapping("/lists")
    @ResponseStatus(HttpStatus.CREATED)
    public MovieList addMovieList(@Valid @RequestBody MovieListRequest movieListRequest) {
        return movieListService.saveMovieList(movieListRequest);
    }

    @Operation(summary = "edit movie list")
    @PutMapping("/lists")
    public MovieList updateMovieList(@Valid @RequestBody MovieList movieList) {
        return movieListService.updateMovieList(movieList);
    }

    @Operation(summary = "delete movie list")
    @DeleteMapping("/lists/{id}")
    public String deleteMovieList(@PathVariable Long id) {
        return movieListService.deleteMovieList(id);
    }
    @Operation(summary = "get movie lists")
    @GetMapping("/lists")
    public List<MovieList> getAllMovieLists() {
        return movieListService.getAllMovieLists();
    }

    @Operation(summary = "get all movies inside movie list")
    @GetMapping("/lists/{id}")
    public List<Movie> getMovieListById(@PathVariable Long id) {
        return movieListService.getAllMoviesByMovieListId(id);
    }


}
