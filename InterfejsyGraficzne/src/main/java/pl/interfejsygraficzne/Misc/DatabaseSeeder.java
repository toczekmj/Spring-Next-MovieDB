package pl.interfejsygraficzne.Misc;

import com.github.javafaker.Faker;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Repository.IActorRepository;
import pl.interfejsygraficzne.Repository.IMovieRepository;
import pl.interfejsygraficzne.Service.ActorService;
import pl.interfejsygraficzne.Service.MovieService;

import java.util.ArrayList;
import java.util.Locale;

import static java.lang.Integer.valueOf;

@Component
public class DatabaseSeeder {

    private final IActorRepository actorRepository;
    private final IMovieRepository movieRepository;
    private final ActorService actorService;
    private final MovieService movieService;

    private final int actorAmount = 10;
    private final int movieAmount = 10;
    public DatabaseSeeder(IActorRepository actorRepository, IMovieRepository movieRepository, ActorService actorService,
                          MovieService movieService){
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository;
        this.movieService = movieService;
        this.actorService = actorService;
    }
    @EventListener
    @Order(0)
    private void seed(ContextRefreshedEvent event){
        seedActors();
        seedMovies();
    }

    private void seedActors() {
        actorRepository.deleteAll();
        actorRepository.setIdCounterToZero();
        Faker faker = new Faker(Locale.ENGLISH);
        for(int i = 0; i < actorAmount; i++){
            Actor a = new Actor();
            a.setFirstName(faker.address().firstName());
            a.setLastName(faker.address().lastName());
            actorService.newActor(a);
        }
        actorRepository.restoreAutoIncrement();
    }

    private void seedMovies(){
        movieRepository.deleteAll();
        movieRepository.setIdCounterToZero();
        Faker faker = new Faker(Locale.ENGLISH);

        for(int i = 0; i < movieAmount; i++){
            Movie m = new Movie();
            m.setTitle(faker.funnyName().name());
            m.setDirector(faker.address().firstName());
            m.setProductionYear(valueOf(faker.number().digits(4)));
            m.setActors(new ArrayList<>());
            m = movieService.saveMovie(m);

            int amount = faker.number().numberBetween(2, 5);

            for(int j = 0; j < amount; j++){
                Long id = (long) faker.number().numberBetween(1, actorAmount);
                Actor a1 = actorService.getActorById(id);
                actorService.attachActorToMovie(m.getMovieId(), a1.getActorId());
            }

            movieService.updateMovie(m);
        }
    }
}
