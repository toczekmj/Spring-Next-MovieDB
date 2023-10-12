package pl.interfejsygraficzne.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double plot;
    private Double acting;
    private Double scenography;
    @ManyToOne
    private Movie movie;
}
