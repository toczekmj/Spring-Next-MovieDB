package pl.interfejsygraficzne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.interfejsygraficzne.Model.Actor;

@Repository
public interface IActorRepository extends JpaRepository<Actor, Long> {
}
