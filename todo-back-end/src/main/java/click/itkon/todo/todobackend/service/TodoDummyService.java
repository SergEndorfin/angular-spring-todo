package click.itkon.todo.todobackend.service;

import click.itkon.todo.todobackend.model.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoDummyService {

    private static final List<Todo> TODOS = new ArrayList<>();

    private static long idCounter = 0;

    static {
        TODOS.add(new Todo(++idCounter, "itkon", "Learn AWS", new Date(), false));
        TODOS.add(new Todo(++idCounter, "itkon", "Learn Terraform", new Date(), false));
        TODOS.add(new Todo(++idCounter, "itkon", "Learn JavaScript", new Date(), true));
    }

    public List<Todo> findAll() {
        return TODOS;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);
        if (todo == null) {
            return null;
        }
        if (TODOS.remove(todo)) {
            return todo;
        }
        return null;
    }

    public Todo findById(long id) {
        return TODOS.stream()
                .filter(todo -> todo.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public Todo save(Todo todo) {
        if (todo.getId() == 0 || todo.getId() == -1) {
            todo.setId(++idCounter);
            TODOS.add(todo);
        } else {
            deleteById(todo.getId());
            TODOS.add(todo);
        }
        return todo;
    }
}
