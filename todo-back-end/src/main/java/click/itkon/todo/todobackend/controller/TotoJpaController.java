package click.itkon.todo.todobackend.controller;

import click.itkon.todo.todobackend.model.Todo;
import click.itkon.todo.todobackend.service.TodoJpaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("jpa/users")
@CrossOrigin(origins = "http://localhost:4200")
public class TotoJpaController {

    @Autowired
    private TodoJpaService service;

    @GetMapping("/{username}/todos")
    public List<Todo> getAllTodosOfAUser(@PathVariable String username) {
        return service.findByUserName(username);
    }

    @GetMapping("/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username,
                        @PathVariable long id) {
        return service.findByUserAndId(username, id);
    }

    @DeleteMapping("/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username,
                                           @PathVariable long id) {
        Todo todo = service.deleteById(id);
        if (Objects.nonNull(todo)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username,
                                           @PathVariable long id,
                                           @RequestBody Todo todo) {
        todo.setUserName(username);
        return new ResponseEntity<>(service.save(todo), HttpStatus.OK);
    }

    @PostMapping("/{username}/todos")
    public ResponseEntity<Todo> saveTodo(@PathVariable String username,
                                         @RequestBody Todo todo) {
        todo.setUserName(username);
        Todo createdTodo = service.save(todo);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdTodo.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }
}
