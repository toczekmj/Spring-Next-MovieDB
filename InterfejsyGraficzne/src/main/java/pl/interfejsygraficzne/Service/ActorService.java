package pl.interfejsygraficzne.Service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Repository.IActorRepository;
import pl.interfejsygraficzne.Repository.IMovieRepository;
import pl.interfejsygraficzne.exception.MovieNotFoundException;

import java.util.List;

@Service
@Transactional
public class ActorService {
    private final IActorRepository actorRepository;
    private final IMovieRepository movieRepository;


    public ActorService(IActorRepository actorRepository, IMovieRepository movieRepository){
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository;

    }

    public Actor getActorById(Long id){
        return actorRepository.findById(id).orElse(null);
    }

    public Actor attachActorToMovie(Long movieid, Long actorid){
        Movie movie = movieRepository.findById(movieid).orElse(null);
        Actor actor = actorRepository.findById(actorid).orElse(null);
        movie.addActor(actor);
        movieRepository.save(movie);
        return actorRepository.save(actor);
    }

    public Actor newActor(Actor actor){
        return actorRepository.save(actor);
    }

    public void removeActor(Long movieid, Long actorid){
        Movie movie = movieRepository.findById(movieid).orElseThrow(MovieNotFoundException::new);
        Actor actor = actorRepository.findById(actorid).orElse(null);
        movie.removeActor(actor);
        movieRepository.save(movie);
        actorRepository.save(actor);
    }

    public List<Actor> getAllActors() {
        return actorRepository.findAll();
    }
}
