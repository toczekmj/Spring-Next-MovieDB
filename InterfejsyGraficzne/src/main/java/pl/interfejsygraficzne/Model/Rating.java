package pl.interfejsygraficzne.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Rating {

    @Id
    @GeneratedValue
    private Long id;
    private Double plot;
    private Double acting;
    private Double scenography;
    @ManyToOne
    private Movie movie;
}
