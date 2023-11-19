package pl.interfejsygraficzne.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    private String title;
    private String director;
    private Integer productionYear;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rating_id", referencedColumnName = "ratingId")
    private Rating rating;
    @ManyToMany(mappedBy = "movies")
    private List<Actor> actors;


    @OneToMany(mappedBy = "movie")
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
