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
            value = "ALTER TABLE movie AUTO_INCREMENT = 0",
            nativeQuery = true
    )
    void setIdCounterToZero();

    @Modifying
    @Transactional
    @Query(
            value = "ALTER TABLE movie AUTO_INCREMENT = 1",
            nativeQuery = true
    )
    void setIdCounterToAuto();

    List<Movie> findByTitle(String name);

    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM movie",
            nativeQuery = true
    )
    void DeleteData();
}
