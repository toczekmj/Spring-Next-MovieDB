package pl.interfejsygraficzne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.interfejsygraficzne.Model.Actor;

@Repository
public interface IActorRepository extends JpaRepository<Actor, Long> {
    @Modifying
    @Transactional
    @Query(
            value = "alter table actor AUTO_INCREMENT=0",
            nativeQuery = true
    )
    void setIdCounterToZero();

    @Modifying
    @Transactional
    @Query(
            value = "alter table actor AUTO_INCREMENT=1",
            nativeQuery = true
    )
    void restoreAutoIncrement();
}
