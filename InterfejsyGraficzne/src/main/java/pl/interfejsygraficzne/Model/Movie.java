package pl.interfejsygraficzne.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Entity
@Data
public class Movie {

    @Id
    @GeneratedValue
    private Long movieId;
    private String title;
    private String director;
    private Integer productionYear;
    private Double rating;
    @ManyToMany
    private List<Actor> actors;

    @OneToMany(mappedBy = "movie")
    private List<Comment> comments;
}
