package pl.interfejsygraficzne.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {
    @GetMapping("/")
    public String index(){
        return "8=====D";
    }

    @GetMapping("palestine")
    public List<String> palestine() {
        return List.of("free", "number one");
    }
}
