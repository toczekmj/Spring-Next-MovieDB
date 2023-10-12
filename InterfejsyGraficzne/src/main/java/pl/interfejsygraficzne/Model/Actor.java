package pl.interfejsygraficzne.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actorId;
    private String firstName;
    private String lastName;
    @ManyToMany(
            cascade = CascadeType.ALL
    )
    @JoinTable(
            name="actor_movie_map",
            joinColumns = @JoinColumn(
                    name = "actor_id",
                    referencedColumnName = "actorId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "movie_id",
                    referencedColumnName = "movieId"
            )
    )
    @JsonIgnore
    private List<Movie> movies;
}
