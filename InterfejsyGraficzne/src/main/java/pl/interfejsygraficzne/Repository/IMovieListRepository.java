package pl.interfejsygraficzne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.interfejsygraficzne.Model.MovieList;

@Repository
public interface IMovieListRepository extends JpaRepository<MovieList, Long> {
}
