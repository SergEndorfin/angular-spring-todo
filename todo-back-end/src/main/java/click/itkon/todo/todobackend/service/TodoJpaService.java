package click.itkon.todo.todobackend.service;

import click.itkon.todo.todobackend.model.Todo;
import click.itkon.todo.todobackend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoJpaService {

    private final TodoRepository repository;

    public TodoJpaService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> findByUserName(String userName) {
        return repository.findAllByUserName(userName);
    }

    public Todo findByUserAndId(String userName, long id) {
        return repository.findByUserNameAndId(userName, id);
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);
        if (todo == null) {
            return null;
        } else {
            repository.deleteById(id);
            return todo;
        }
    }

    public Todo findById(long id) {
        return repository.findById(id)
                .orElse(null);
    }

    public Todo save(Todo todo) {
        return repository.save(todo);
    }
}
