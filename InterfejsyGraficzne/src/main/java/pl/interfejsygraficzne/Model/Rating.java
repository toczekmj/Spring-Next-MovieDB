package pl.interfejsygraficzne.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;
    private Double plot;
    private Double acting;
    private Double scenography;
    @OneToOne(mappedBy = "rating")
    private Movie movie;
}
