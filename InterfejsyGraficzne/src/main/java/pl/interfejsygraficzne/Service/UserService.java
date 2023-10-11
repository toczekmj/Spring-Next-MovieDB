package pl.interfejsygraficzne.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.interfejsygraficzne.Model.User;
import pl.interfejsygraficzne.Repository.IMySqlRepository;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private IMySqlRepository repository;

    public User saveUser(User user){
        return repository.save(user);
    }

    public List<User> saveUsers(List<User> users){
        return repository.saveAll(users);
    }

    public List<User> getUsers(){
        return repository.findAll();
    }

    public User getUserById(int id){
        return repository.findById(id).orElse(null);
    }

    public List<User> getUsersByFirstName(String name){
        return repository.findByFirstName(name);
    }

    public String deleteUser(int id){
        repository.deleteById(id);
        return "User " + id + " removed";
    }

    public User updateUser(User user){
        User existingUser = repository.findById(user.getId()).orElse(null);
        existingUser.setName(user.getName());
        existingUser.setSurname(user.getSurname());
        existingUser.setAge(user.getAge());
        return repository.save(existingUser);
    }

}
