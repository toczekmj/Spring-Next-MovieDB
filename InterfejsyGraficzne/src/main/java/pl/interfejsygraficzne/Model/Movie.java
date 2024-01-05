package pl.interfejsygraficzne.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Entity
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    @NotNull(message = "Pole tytułu filmu nie może pozostać puste.")
    @Size(max = 40, message = "Tytuł filmu zbyt długi.")
    private String title;
    @NotNull(message = "Pole reżysera nie może pozostać puste.")
    private String director;

    @Column(columnDefinition = "LONGTEXT")
    @NotNull(message = "Pole opisu filmu nie może pozostać puste")
    private String description;
    @NotNull
    private String Genre;
  
    @NotNull
    @Range(min = 1800, max = 2024, message = "Rok musi być wartością między 1800 a 2024 rokiem")
    private Integer productionYear;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rating_id", referencedColumnName = "ratingId")
    private Rating rating;

    @ManyToMany(mappedBy = "movies", cascade = CascadeType.REMOVE)
    private List<Actor> actors;

    @JsonProperty(defaultValue = "https://imgur.com/i9PqYju.png")
    @NotNull
    private String photoURL;

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
