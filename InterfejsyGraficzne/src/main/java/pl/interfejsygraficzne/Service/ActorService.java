package pl.interfejsygraficzne.Service;

import org.springframework.stereotype.Service;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Repository.IActorRepository;
import pl.interfejsygraficzne.Repository.IMovieRepository;

@Service
public class ActorService {
    private final IActorRepository actorRepository;
    private final IMovieRepository movieRepository;


    public ActorService(IActorRepository actorRepository, IMovieRepository movieRepository){
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository;

    }

    public Actor addActor(Long movieid, Long actorid){
        Movie movie = movieRepository.findById(movieid).orElse(null);
        Actor actor = actorRepository.findById(actorid).orElse(null);
        actor.addMovie(movie);
        movie.addActor(actor);
        movieRepository.save(movie);
        return actorRepository.save(actor);
    }

    public Actor newActor(Actor actor){
        return actorRepository.save(actor);
    }

}
