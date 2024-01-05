package pl.interfejsygraficzne.Repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.interfejsygraficzne.Model.MovieList;

@Repository
public interface IMovieListRepository extends JpaRepository<MovieList, Long> {
    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM movie_list_movies",
            nativeQuery = true
    )
    void DeleteLists();
    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM movie_list",
            nativeQuery = true
    )
    void DeleteListsLinks();

}
