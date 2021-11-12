import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  todo: Todo;
  @Output() newTitleEvent = new EventEmitter<string>();

  todoList: TodoListComponent;

  constructor(
    private todoService: TodoService,
    todoList: TodoListComponent,
    private route: ActivatedRoute
  ) {
    this.todo = { id: 0, name: '', isChecked: false };
    this.todoList = todoList;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let id = params.get('id');
        this.todoService.getTodo(+id!).subscribe(
          (result) => this.todo = result
        );
      }
    );
  }

  save(newTitle: string): void {
    if (this.todo && newTitle) { // prevent empty names
      this.todoService.updateTodo({
          id: this.todo.id,
          name: newTitle,
          isChecked: this.todo.isChecked,
        })
        .subscribe(() => this.newTitleEvent.emit(newTitle));
      // update the name on the component itself
      this.todo.name = newTitle;
    }
  }

  cancel(): void {
    this.todoList.isVisible = false;
  }
}
