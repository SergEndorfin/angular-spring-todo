package click.itkon.todo.todobackend.controller;

import click.itkon.todo.todobackend.model.HelloThere;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GreetingController {

    @GetMapping("hello-there/{name}")
    public HelloThere hello(@PathVariable String name) {
        return new HelloThere(String.format("hello there, %s", name));
    }
}
