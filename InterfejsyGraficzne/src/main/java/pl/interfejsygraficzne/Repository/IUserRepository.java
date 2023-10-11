package pl.interfejsygraficzne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.interfejsygraficzne.Model.User;

import java.util.List;

public interface IUserRepository extends JpaRepository<User, Integer> {
    List<User> findByFirstName(String name);
}
