package pl.interfejsygraficzne.Misc;

import com.github.javafaker.Faker;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import pl.interfejsygraficzne.Model.Actor;
import pl.interfejsygraficzne.Model.Comment;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Model.Rating;
import pl.interfejsygraficzne.Repository.IActorRepository;
import pl.interfejsygraficzne.Repository.ICommentRepository;
import pl.interfejsygraficzne.Repository.IMovieRepository;
import pl.interfejsygraficzne.Repository.IRatingRepository;
import pl.interfejsygraficzne.Service.ActorService;
import pl.interfejsygraficzne.Service.CommentService;
import pl.interfejsygraficzne.Service.MovieService;
import pl.interfejsygraficzne.Service.RatingService;

import java.util.ArrayList;
import java.util.Locale;
import java.util.Objects;

import static java.lang.Integer.valueOf;

@Component
public class DatabaseSeeder {

    private final Environment env;
    private final IActorRepository actorRepository;
    private final IMovieRepository movieRepository;
    private final ICommentRepository commentRepository;
    private final IRatingRepository ratingRepository;
    private final CommentService commentService;
    private final ActorService actorService;
    private final MovieService movieService;
    private final RatingService ratingService;

    private final int actorAmount = 5;
    private final int movieAmount = 3;
    private final int actorsUpperBoundInMovie = 1;
    private final int commentUpperBoundInMovie = 2;
    private final int ratingUpperBoundInMovie = 5;
    private Faker faker;

    public DatabaseSeeder(IActorRepository actorRepository,
                          IMovieRepository movieRepository,
                          ICommentRepository commentRepository,
                          IRatingRepository ratingRepository,
                          ActorService actorService,
                          MovieService movieService,
                          CommentService commentService,
                          RatingService ratingService,
                          Environment env
                        )
    {
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository;
        this.ratingRepository = ratingRepository;
        this.movieService = movieService;
        this.actorService = actorService;
        this.commentService = commentService;
        this.commentRepository = commentRepository;
        this.ratingService = ratingService;
        this.env = env;
    }
    @EventListener(ContextRefreshedEvent.class)
    @Order(0)
    public void seed(ContextRefreshedEvent event){
        faker = new Faker(Locale.ENGLISH);
        String path = env.getProperty("seed.on.startup");
        if(Objects.requireNonNull(path).equalsIgnoreCase("true")){
            seedActors();
            seedMovies();
        }
    }

    private void seedActors() {
        actorRepository.deleteAll();
        actorRepository.deleteActing();
        actorRepository.setIdCounterToZero();

        for(int i = 0; i < actorAmount; i++){
            Actor a = new Actor();
            a.setFirstName(faker.address().firstName());
            a.setLastName(faker.address().lastName());
            actorService.newActor(a);
        }

        actorRepository.restoreAutoIncrement();
    }

    private void seedMovies(){
        //remove all unnecessary stuff from database and reset ID's
        commentRepository.DeleteData();
        movieRepository.DeleteData();
        ratingRepository.DeleteData();
        movieRepository.setIdCounterToZero();
        commentRepository.setIdCounterToZero();
        ratingRepository.setIdCounterToZero();


        //create new movie and add Actors, Comments, and Rating
        for(int i = 0; i < movieAmount; i++){
            Movie m = new Movie();
            m.setTitle(faker.funnyName().name());
            m.setDirector(faker.address().firstName());
            m.setProductionYear(valueOf(faker.number().digits(4)));
            m.setActors(new ArrayList<>());
            m.setComments(new ArrayList<>());
            m.setRating(null);
            m = movieService.saveMovie(m);

            //add actors
            int amount = faker.number().numberBetween(1, actorsUpperBoundInMovie);
            for(int j = 0; j < amount; j++){
                Long id = (long) faker.number().numberBetween(1, actorAmount);
                Actor a1 = actorService.getActorById(id);
                actorService.attachActorToMovie(m.getMovieId(), a1.getActorId());
            }

            //add comment
            int commentAmount = faker.number().numberBetween(1, commentUpperBoundInMovie);
            for(int j = 0; j < commentAmount; j++){
                commentService.saveComment(
                        generateGibberishComment(),
                        m.getMovieId()
                );
            }
            movieService.updateMovie(m);

            //add rating for the movie
            int ratingAmount = faker.number().numberBetween(1, ratingUpperBoundInMovie);
            Rating r = new Rating();
            for(int j = 0; j < ratingAmount; j++){
                r.setPlot(faker.number().numberBetween(1,5));
                r.setScenography(faker.number().numberBetween(1,5));
                r.setActing(faker.number().numberBetween(1,5));
                ratingService.addRating(m.getMovieId(), r);
            }

        }

        ratingRepository.setIdCounterToAuto();
        commentRepository.setIdCounterToAuto();
        movieRepository.setIdCounterToAuto();
    }

    private Comment generateGibberishComment() {
        String s = faker.lorem().characters();
        Comment c = new Comment();
        c.setText(s);
        return c;
    }
}
