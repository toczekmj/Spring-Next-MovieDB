package pl.interfejsygraficzne.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Entity
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    @NotNull(message = "Pole nie może zostać puste.")
    private String title;
    @NotNull
    private String director;
    @NotNull
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @NotNull
    private String Genre;
    @NotNull
    @Range(min = 1800, max = 2050)
    private Integer productionYear;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rating_id", referencedColumnName = "ratingId")
    private Rating rating;
    @ManyToMany(mappedBy = "movies", cascade = CascadeType.REMOVE)
    private List<Actor> actors;


    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void addActor(Actor actor){
        actors.add(actor);
        actor.getMovies().add(this);
    }

    public void removeActor(Actor actor){
        this.actors.remove(actor);
        actor.getMovies().remove(this);
    }
}
