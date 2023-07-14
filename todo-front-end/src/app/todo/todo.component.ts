import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Todo} from "../list-todos/list-todos.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;
  userName: string | null;

  constructor(private todoService: TodoDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
    this.id = 0;
    this.todo = new Todo(this.id, '', new Date(), false);
    this.userName = this.authService.getAuthenticatedUser();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id != -1 && this.userName) {
      this.todoService.retrieveTodo(this.userName, this.id)
        .subscribe(todo => this.todo = todo);
    }
  }

  saveTodo() {
    if (this.userName) {
      if (this.id === -1) {
        this.todoService.createTodo(this.userName, this.todo)
          .subscribe(data => {
            console.log(data);
            this.router.navigate(['todos'])
          });
      } else {
        this.todoService.updateTodo(this.userName, this.id, this.todo)
          .subscribe(data => {
            console.log(data);
            this.router.navigate(['todos'])
          });
      }
    }
  }
}
