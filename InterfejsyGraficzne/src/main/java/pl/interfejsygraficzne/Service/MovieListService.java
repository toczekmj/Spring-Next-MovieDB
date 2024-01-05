package pl.interfejsygraficzne.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.MovieList;
import pl.interfejsygraficzne.Model.MovieListRequest;
import pl.interfejsygraficzne.Repository.IMovieListRepository;
import pl.interfejsygraficzne.Repository.IMovieRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MovieListService {

    private final IMovieListRepository movieListRepository;

    private final MovieService movieService;
    public MovieList saveMovieList(MovieListRequest movieListRequest) {
        List<Movie> movies = movieService.getMoviesById(movieListRequest.getMovieIds());
        MovieList movieList = new MovieList();
        movieList.setListName(movieListRequest.getListName());
        movieList.setMovies(movies);
        movieListRepository.save(movieList);
        return movieList;
    }

    public List<MovieList> getAllMovieLists() {
        return movieListRepository.findAll();
    }

    public List<Movie> getAllMoviesByMovieListId(Long id) {
        MovieList movieList = movieListRepository.findById(id).orElse(null);
        return movieList.getMovies();
    }

    public String deleteMovieList(Long id) {
        movieListRepository.deleteById(id);
        return "MovieList " + id + " removed";
    }

    public MovieList updateMovieList(MovieList movieList) {
        MovieList existingMovieList = movieListRepository.findById(movieList.getMovieListId()).orElse(null);
        existingMovieList.setListName(movieList.getListName());
        existingMovieList.setMovies(movieList.getMovies());
        return movieListRepository.save(existingMovieList);
    }

    public MovieList getMovieListById(Long id) {
        return movieListRepository.findById(id).orElse(null);
    }
}
