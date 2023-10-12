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
    @ManyToMany
    private List<Actor> actors;


    @OneToMany(mappedBy = "movie")
    private List<Comment> comments;

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void addActor(Actor actor){
        actors.add(actor);
    }
}
