package click.itkon.todo.todobackend.controller;

import click.itkon.todo.todobackend.model.AuthBean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BasicAuthController {

    @GetMapping("/basic-auth")
    public AuthBean hello() {
        return new AuthBean("You are authenticated!");
    }
}
