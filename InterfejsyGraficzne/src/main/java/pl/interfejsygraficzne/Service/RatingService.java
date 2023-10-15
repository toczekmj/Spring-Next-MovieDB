package pl.interfejsygraficzne.Service;

import org.springframework.stereotype.Service;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.Rating;
import pl.interfejsygraficzne.Repository.IMovieRepository;
import pl.interfejsygraficzne.exception.MovieNotFoundException;

@Service
public class RatingService {
    private final IMovieRepository movieRepository;
    private final MovieService movieService;

    public RatingService(IMovieRepository movieRepository,
                         MovieService movieService){
        this.movieRepository = movieRepository;
        this.movieService = movieService;
    }

    public Movie addRating(Long movieid, Rating rating){

        Movie movie = movieRepository.findById(movieid).orElseThrow(MovieNotFoundException::new);
        Rating currentRating = movie.getRating();

        currentRating.setPlot(rating.getPlot()+currentRating.getPlot());
        currentRating.setActing(rating.getActing()+currentRating.getActing());
        currentRating.setScenography(rating.getScenography()+currentRating.getScenography());
        currentRating.setVotesCount(currentRating.getVotesCount()+1);
        movie.setRating(currentRating);
        movieService.updateMovie(movie);
        return movie;
    }
}
