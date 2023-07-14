import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public targetDate: Date,
    public done: boolean) {
  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[] = [];
  message: string = '';
  userName: string | null = null;

  constructor(private todoDataService: TodoDataService,
              private router: Router,
              private authService: AuthenticationService) {
    this.userName = this.authService.getAuthenticatedUser();
  }

  ngOnInit(): void {
    this.refreshTodos();
    console.log(this.userName, '<<')
  }

  deleteTodo(id: number) {
    if (this.userName) {
      this.todoDataService
        .deleteTodo(this.userName, id)
        .subscribe({
          next: response => {
            this.message = `Delete Todo with id '${id}' successful.`;
            this.refreshTodos();
          }
        });
    }
  }

  refreshTodos() {
    console.log('>>> ', this.userName);
    if (this.userName) {
      this.todoDataService
        .retrieveAllTodos(this.userName)
        .subscribe(todos => {
          this.todos = todos
        });
    }
  }

  updateTodo(id: number) {
    this.router.navigate(['todos', id])
  }

  createTodo() {
    this.router.navigate(['todos', -1])
  }
}
