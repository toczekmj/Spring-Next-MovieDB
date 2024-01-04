package pl.interfejsygraficzne.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actorId;
    @NotNull
    @Size(min = 2, max = 20, message = "Imię powinno składać się z conajmniej 2 liter.")
    private String firstName;
    @NotNull
    @Size(min = 2, max = 20, message = "Nazwisko powinno składać się z conajmniej 2 liter.")
    private String lastName;
    @ManyToMany
    @JoinTable(
            name="movies_acted",
            joinColumns = @JoinColumn(name = "actor_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id")
    )
    @JsonIgnore
    private List<Movie> movies;
}
