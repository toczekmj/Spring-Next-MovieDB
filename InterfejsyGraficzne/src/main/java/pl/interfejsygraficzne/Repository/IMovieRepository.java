package pl.interfejsygraficzne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.interfejsygraficzne.Model.Movie;

import java.util.List;

@Repository
public interface IMovieRepository extends JpaRepository<Movie, Long> {
    @Modifying
    @Transactional
    @Query(
            value = "alter table movie AUTO_INCREMENT=0",
            nativeQuery = true
    )
    void setIdCounterToZero();
    List<Movie> findByTitle(String name);
}
