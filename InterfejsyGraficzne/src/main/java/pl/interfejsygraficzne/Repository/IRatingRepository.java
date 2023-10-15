package pl.interfejsygraficzne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.interfejsygraficzne.Model.Rating;

@Repository
public interface IRatingRepository extends JpaRepository<Rating, Long> {
}
