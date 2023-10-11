package pl.interfejsygraficzne.Service;

import org.springframework.stereotype.Service;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Repository.IMovieRepository;
import pl.interfejsygraficzne.exception.MovieNotFoundException;

import java.util.List;

@Service
public class MovieService {
    private final IMovieRepository repository;


    public MovieService(IMovieRepository repository) {
        this.repository = repository;
    }

    public Movie saveMovie(Movie movie){
        return repository.save(movie);
    }

    public List<Movie> saveUsers(List<Movie> movies){
        return repository.saveAll(movies);
    }

    public List<Movie> getMovies(){
        return repository.findAll();
    }

    public Movie getMovieById(Long id){
        return repository.findById(id).orElseThrow(MovieNotFoundException::new);
    }

    public List<Movie> getMoviesByTitle(String name){
        return repository.findByTitle(name);
    }

    public String deleteMovie(Long id){
        repository.deleteById(id);
        return "User " + id + " removed";
    }

    public Movie updateMovie(Movie movie){
        Movie existingMovie = repository.findById(movie.getMovieId()).orElseThrow(MovieNotFoundException::new);
        existingMovie.setTitle(movie.getTitle());
        existingMovie.setDirector(movie.getDirector());
        existingMovie.setProductionYear(movie.getProductionYear());
        existingMovie.setRating(movie.getRating());
        existingMovie.setActors(movie.getActors());
        return repository.save(existingMovie);
    }

}
