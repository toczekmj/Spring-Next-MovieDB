package pl.interfejsygraficzne.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyErrorController implements ErrorController {
    @RequestMapping("/error")
    public String Error(){
        return """
                Pewnie szukasz tego xd
                <a href="http://api.projektimdb.it/swagger-ui/index.html">SwaggerUI</a>""";
    }
}
