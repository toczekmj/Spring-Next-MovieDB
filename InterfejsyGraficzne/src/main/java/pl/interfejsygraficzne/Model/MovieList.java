package pl.interfejsygraficzne.Model;


import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;
import java.util.Set;


@Data
@Entity
public class MovieList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieListId;
    @Size(min = 3, max = 20, message = "Nazwa listy powinna zawierać między 3 a 20 znaków.")
    @NotNull
    private String listName;

    @Valid
    @NotEmpty(message = "Lista musi zawierać przynajmniej jeden film!")
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "movie_list_id"),
            inverseJoinColumns = @JoinColumn(name = "movieId")
    )
    private List<Movie> movies;

    private String movieListURL = "https://imgur.com/i9PqYju.png";




}
