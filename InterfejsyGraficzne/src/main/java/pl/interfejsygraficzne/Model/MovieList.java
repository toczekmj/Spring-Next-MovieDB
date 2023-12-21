package pl.interfejsygraficzne.Model;


import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Set;


@Data
@Entity
public class MovieList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieListId;

    @NotNull(message = "Nie podano nazwy listy!")
    private String listName;

    @Valid
    @NotEmpty(message = "Lista musi zawierać przynajmniej jeden film!")
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "movie_list_id"),
            inverseJoinColumns = @JoinColumn(name = "movieId")
    )
    private List<Movie> movies;

    private String movieListURL;

    // TODO implementation of users, security, so each user can have their own lists.

    @PrePersist
    public void generateListUrl() {
        // generating url when adding new MovieList, url might be changed.
        this.movieListURL = "/lists/" + this.movieListId + "-" + this.listName.toLowerCase().replace(" ", "-");
    }

}
