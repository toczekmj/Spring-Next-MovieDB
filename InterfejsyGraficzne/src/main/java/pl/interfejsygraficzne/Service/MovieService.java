package pl.interfejsygraficzne.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.Rating;
import pl.interfejsygraficzne.Repository.IMovieRepository;
import pl.interfejsygraficzne.exception.MovieNotFoundException;

import java.util.List;

@Service
@Transactional
public class MovieService {
    private final IMovieRepository repository;
    private final ActorService actorService;
    public MovieService(IMovieRepository repository, ActorService actorService) {
        this.repository = repository;
        this.actorService = actorService;
    }
    public Movie saveMovie(Movie movie){
        List<Actor> actors = movie.getActors();
        if (!actors.isEmpty()) {
            for (Actor actor : actors) {
                actorService.saveActor(actor);
            }
        }
        return repository.save(movie);
    }
    public List<Movie> getMovies(){
        return repository.findAll();
    }

    public Movie getMovieById(Long id){
        return repository.findById(id).orElseThrow(MovieNotFoundException::new);
    }

    public List<Movie> getMoviesById(List<Long> id) {
        return repository.findAllById(id);
    }

    public List<Movie> getMoviesByTitle(String name){
        return repository.findByTitle(name);
    }

    public String deleteMovie(Long id){
        repository.deleteById(id);
        return "Movieid " + id + " removed";
    }
    public Movie updateMovie(Movie movie){
        Movie existingMovie = repository.findById(movie.getMovieId()).orElseThrow(MovieNotFoundException::new);
        existingMovie.setTitle(movie.getTitle());
        existingMovie.setDirector(movie.getDirector());
        existingMovie.setProductionYear(movie.getProductionYear());
        existingMovie.setRating(movie.getRating());
        existingMovie.setActors(movie.getActors());
        existingMovie.setGenre(movie.getGenre());
        return repository.save(existingMovie);
    }

    public Rating getCalculatedRating(Long id){
        Movie movie = getMovieById(id);
        Rating rating = movie.getRating();
        Rating output = new Rating();
        output.setMovieId(rating.getMovieId());
        output.setRatingId(rating.getRatingId());
        output.setActing(rating.getActing()/rating.getVotesCount());
        output.setScenography(rating.getScenography()/rating.getVotesCount());
        output.setPlot(rating.getPlot()/rating.getVotesCount());
        output.setVotesCount(rating.getVotesCount());
        return output;
    }

}
