package pl.interfejsygraficzne;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChujController {
    @GetMapping("kuba")
    public String Chuj(){
        return "8=====D";
    }

    @GetMapping("palestine")
    public List<String> palestine() {
        return List.of("free", "number one");
    }
}
