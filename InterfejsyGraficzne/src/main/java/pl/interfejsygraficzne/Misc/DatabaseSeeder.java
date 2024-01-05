package pl.interfejsygraficzne.Misc;

import com.github.javafaker.Faker;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import pl.interfejsygraficzne.Model.*;
import pl.interfejsygraficzne.Repository.*;
import pl.interfejsygraficzne.Service.*;

import java.util.ArrayList;
import java.util.List;
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
    private final IMovieListRepository movieListRepository;
    private final CommentService commentService;
    private final ActorService actorService;
    private final MovieService movieService;
    private final RatingService ratingService;

    private final int actorAmount = 300;
    private final int movieAmount = 60;
    private final int listsAmount = 5;
    private final int moviesUpperBoundInList = 15;
    private final int actorsUpperBoundInMovie = 20;
    private final int commentUpperBoundInMovie = 15;
    private final int ratingUpperBoundInMovie = 100;
    private final MovieListService movieListService;
    private Faker faker;

    private List<String> genres = new ArrayList<>();

    public DatabaseSeeder(IActorRepository actorRepository,
                          IMovieRepository movieRepository,
                          ICommentRepository commentRepository,
                          IRatingRepository ratingRepository,
                          IMovieListRepository movieListRepository,
                          ActorService actorService,
                          MovieService movieService,
                          MovieListService movieListService,
                          CommentService commentService,
                          RatingService ratingService,
                          Environment env
                        )
    {
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository;
        this.ratingRepository = ratingRepository;
        this.movieListRepository = movieListRepository;
        this.movieService = movieService;
        this.movieListService = movieListService;
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
            fillGeneres();
            seedActors();
            seedMovies();
            seedLists();
        }
        System.out.println("Seeding Completed" + TColours.ANSI_RESET);
    }


    private void fillGeneres() {
        genres.add("Komedia");
        genres.add("Akcja");
        genres.add("ScienceFiction");
        genres.add("Romans");
        genres.add("Animacja");
        genres.add("Dramat");
        genres.add("Thriller");
        genres.add("Kryminał");
        genres.add("Fabularny");
        genres.add("Dokumentalny");
    }

    private void seedActors() {
        actorRepository.deleteAll();
        actorRepository.deleteActing();
        actorRepository.setIdCounterToZero();

        for(int i = 0; i < actorAmount; i++){
            Actor a = new Actor();
            a.setFirstName(faker.address().firstName());
            a.setLastName(faker.address().lastName());
            actorService.saveActor(a);
        }

        actorRepository.restoreAutoIncrement();
    }

    private void seedLists() {
        for(int i = 0; i < listsAmount; i++){
            var amount = faker.number().numberBetween(1, moviesUpperBoundInList);
            MovieListRequest mvr = new MovieListRequest();
            mvr.setListName("Lista nr " + i);
            ArrayList<Long> movies = new ArrayList<>();

            for(int j = 0; j < amount; j++)
                movies.add((long) faker.number().numberBetween(1, movieAmount));
            mvr.setMovieIds(movies);
            movieListService.saveMovieList(mvr);
        }
    }
    private void seedMovies(){
        DeleteContentFromDB();

        //create new movie and add Actors, Comments, and Rating
        for(int i = 0; i < movieAmount; i++){
            //set genre
            int randomGenre = faker.number().numberBetween(0,genres.size()-1);
            String genre = genres.get(randomGenre);

            //set description
            String desc = faker.lorem().sentence(50);


            Movie m = new Movie();
            m.setTitle(faker.funnyName().name());
            m.setDirector(faker.address().firstName());
            m.setProductionYear(valueOf(faker.number().numberBetween(1800, 2024)));
            m.setActors(new ArrayList<>());
            m.setComments(new ArrayList<>());
            m.setRating(null);
            m.setGenre(genre);
            m.setDescription(desc);
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

    private void DeleteContentFromDB() {
        //remove all unnecessary stuff from database and reset ID's
        commentRepository.DeleteData();
        movieListRepository.DeleteLists();
        movieListRepository.DeleteListsLinks();
        movieRepository.DeleteData();
        ratingRepository.DeleteData();
        movieRepository.setIdCounterToZero();
        commentRepository.setIdCounterToZero();
        ratingRepository.setIdCounterToZero();
    }

    private Comment generateGibberishComment() {
        String s = faker.lorem().sentence(15);
        Comment c = new Comment();
        c.setText(s);
        return c;
    }
}
