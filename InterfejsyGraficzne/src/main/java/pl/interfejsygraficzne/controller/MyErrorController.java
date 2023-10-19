package pl.interfejsygraficzne.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyErrorController implements ErrorController {
    @RequestMapping("/error")
    public void Error(HttpServletResponse response){
        response.setHeader("Location", "https://google.com");
//        response.setHeader("Location", "http://api.projektimdb.it/swagger-ui/index.html");
        response.setStatus(302);
//        return """
//                Pewnie szukasz tego xd
//                <a href="http://api.projektimdb.it/swagger-ui/index.html">SwaggerUI</a>""";
    }
}
