package click.itkon.todo.todobackend.controller;

import click.itkon.todo.todobackend.model.Todo;
import click.itkon.todo.todobackend.service.TodoDummyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TotoDummyController {

    @Autowired
    private TodoDummyService todoDummyService;

    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username) {
        return todoDummyService.findAll();
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getAllTodos(@PathVariable String username,
                            @PathVariable long id) {
        return todoDummyService.findById(id);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username,
                                           @PathVariable long id) {
        Todo todo = todoDummyService.deleteById(id);
        if (Objects.nonNull(todo)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username,
                                           @PathVariable long id,
                                           @RequestBody Todo todo) {
        Todo updatedTodo = todoDummyService.save(todo);
        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }

    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Todo> saveTodo(@PathVariable String username,
                                         @RequestBody Todo todo) {
        Todo createdTodo = todoDummyService.save(todo);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdTodo.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }
}
