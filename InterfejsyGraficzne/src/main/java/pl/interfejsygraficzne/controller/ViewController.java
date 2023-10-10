package pl.interfejsygraficzne.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ViewController {


    @GetMapping("view1")
    public String mainView() {
        return "mainview";
    }
}
