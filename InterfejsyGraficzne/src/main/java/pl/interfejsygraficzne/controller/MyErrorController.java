package pl.interfejsygraficzne.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyErrorController implements ErrorController {
    @RequestMapping("/error")
    public void Error(HttpServletResponse response){
//        response.setHeader("Location", "http://api.projektimdb.it/swagger-ui/index.html");
        response.setHeader("Location", "http://localhost/swagger-ui/index.html");
        response.setStatus(302);
    }
}
