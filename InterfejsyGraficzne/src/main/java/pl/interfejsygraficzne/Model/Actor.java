package pl.interfejsygraficzne.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Actor {

    @Id
    @GeneratedValue
    private Long actorId;
    private String firstName;
    private String lastName;
    @ManyToMany(
            cascade = CascadeType.ALL
    )
    @JoinTable(
            name="student_course_map",
            joinColumns = @JoinColumn(
                    name = "actor_id",
                    referencedColumnName = "actorId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "movie_id",
                    referencedColumnName = "movieId"
            )
    )
    private List<Movie> movies;
}
