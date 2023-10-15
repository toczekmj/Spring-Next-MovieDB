package pl.interfejsygraficzne.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;
    private Long movieId;
    private Integer plot = 0;
    private Integer acting = 0;
    private Integer scenography = 0;
    private Integer votesCount = 0;
}
