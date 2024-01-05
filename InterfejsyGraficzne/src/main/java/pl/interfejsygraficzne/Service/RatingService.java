package pl.interfejsygraficzne.Service;

import org.springframework.stereotype.Service;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.Rating;
import pl.interfejsygraficzne.Repository.IMovieRepository;
import pl.interfejsygraficzne.Repository.IRatingRepository;
import pl.interfejsygraficzne.exception.MovieNotFoundException;

@Service
public class RatingService {
    private final IMovieRepository movieRepository;
    private final MovieService movieService;
    private final IRatingRepository ratingRepository;

    public RatingService(IMovieRepository movieRepository,
                         MovieService movieService,
                         IRatingRepository ratingRepository){
        this.movieRepository = movieRepository;
        this.movieService = movieService;
        this.ratingRepository = ratingRepository;
    }

    public Rating createNewRating(Long movieID){
        Rating r = new Rating();
        r.setMovieId(movieID);
        r.setPlot(0);
        r.setScenography(0);
        r.setActing(0);
        r.setVotesCount(0);
        return ratingRepository.save(r);
    }

    public Movie addRating(Long movieid, Rating rating){
        Movie movie = movieRepository.findById(movieid).orElseThrow(MovieNotFoundException::new);
        Rating currentRating = movie.getRating();
        if(currentRating == null){
            currentRating = createNewRating(movieid);
        }
        else if(currentRating.getMovieId() == null) {
            currentRating.setMovieId(movieid);
        }
        else {
            currentRating.setPlot(rating.getPlot()+currentRating.getPlot());
            currentRating.setActing(rating.getActing()+currentRating.getActing());
            currentRating.setScenography(rating.getScenography()+currentRating.getScenography());
            currentRating.setVotesCount(currentRating.getVotesCount()+1);
        }
        movie.setRating(currentRating);
        movieService.updateMovie(movie);
        return movie;
    }
}
