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
    // This will be overwritten by the edit component
    this.editedTodo = { id: 0, name: '', isChecked: false };
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
    });
  }

  openEditView(todo: Todo): void {
    this.isVisible = true;
    this.editedTodo = todo;
  }

  edit(todoName: string): void {
    if (todoName) {
      this.editedTodo.name = todoName;
    }
  }

  delete(todo: Todo): void {
    this.todoService.deleteTodo(todo.id).subscribe(() =>
    this.todos = this.todos.filter(
      todoToDelete => todoToDelete.id !== todo.id)
    );
    this.isVisible = false; // Hide the edit pane on deletion
  }

  markDone(): void {
    console.log('Item will be marked as done here');
  }
}
