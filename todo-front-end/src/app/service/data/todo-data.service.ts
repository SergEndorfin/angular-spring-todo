import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../../list-todos/list-todos.component";
import {TODO_JPA_API_URL} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private client: HttpClient) {
  }

  retrieveAllTodos(userName: string) {
    return this.client
      .get<Todo[]>(`${TODO_JPA_API_URL}/users/${userName}/todos`);
  }

  retrieveTodo(userName: string, id: number) {
    return this.client
      .get<Todo>(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`)
  }

  deleteTodo(userName: string, id: number) {
    return this.client
      .delete(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`)
  }

  updateTodo(userName: string, id: number, todo: Todo) {
    return this.client
      .put(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`, todo)
  }

  createTodo(userName: string, todo: Todo) {
    return this.client
      .post(`${TODO_JPA_API_URL}/users/${userName}/todos/`, todo)
  }
}
