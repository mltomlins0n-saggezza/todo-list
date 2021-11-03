import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  isVisible = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  edit(): void {
    console.log('Item details will be edited here');
    this.isVisible = !this.isVisible;
  }

  delete(): void {
    console.log('Item will be deleted here');
  }

  markDone(): void {
    console.log('Item will be marked as done here');
  }
}
