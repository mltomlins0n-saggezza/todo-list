import { Component, OnInit } from '@angular/core';

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

  editedTodo: Todo;

  constructor(private todoService: TodoService) {
    this.editedTodo = {id: 0, name: 'test', isChecked: false};
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.todoService.addTodo({ name } as Todo)
    .subscribe(todo => {
      this.todos.push(todo);
    })
  }

  edit(todo: Todo): void {
    console.log('Item details will be edited here');
    this.isVisible = !this.isVisible;
    this.editedTodo = todo;
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(todoToDelete => todoToDelete !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
    this.isVisible = false; // Hide the edit pane on deletion
  }

  markDone(): void {
    console.log('Item will be marked as done here');
  }
}
