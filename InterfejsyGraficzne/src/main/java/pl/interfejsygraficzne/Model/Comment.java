package pl.interfejsygraficzne.Model;

import jakarta.persistence.*;
import jakarta.security.auth.message.callback.PrivateKeyCallback;
import lombok.Data;
import org.apache.logging.log4j.message.LoggerNameAwareMessage;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue
    private Long id;
    private String text;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "movie_id", referencedColumnName = "movieId") // do przetestowania
    private Movie movie;
}
