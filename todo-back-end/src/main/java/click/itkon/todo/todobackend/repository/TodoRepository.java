package click.itkon.todo.todobackend.repository;

import click.itkon.todo.todobackend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByUserName(String userName);

    Todo findByUserNameAndId(String userName, Long id);
}
