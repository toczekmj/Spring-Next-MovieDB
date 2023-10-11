package pl.interfejsygraficzne.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.User;
import pl.interfejsygraficzne.Service.UserService;

import java.util.List;

@RestController
public class UserController {

    private UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/adduser")
    public User addUser(@RequestBody User user){
        return service.saveUser(user);
    }

    @PostMapping("/addusers")
    public List<User> addUsers(@RequestBody List<User> users){
        return service.saveUsers(users);
    }

    @GetMapping("/getallusers")
    public List<User> finAllUsers(){
        return service.getUsers();
    }

    @GetMapping("/getuserbyid/{id}")
    public User findUserById(@PathVariable int id){
        return service.getUserById(id);
    }

    @GetMapping("/getuserbyname/{name}")
    public List<User> findUsersByFirstName(@PathVariable String name){
        return service.getUsersByFirstName(name);
    }

    @PutMapping("/updateuser")
    public User updateUser(@RequestBody User user){
        return service.updateUser(user);
    }

    @DeleteMapping("/deleteuser/{id}")
    public String deleteUser(@PathVariable int id){
        return service.deleteUser(id);
    }

}
