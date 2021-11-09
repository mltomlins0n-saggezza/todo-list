import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() newTitleEvent = new EventEmitter<string>();

  constructor(private todoService: TodoService) {
    this.todo = { id: 0, name: '', isChecked: false };
  }

  ngOnInit(): void {}

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
    console.log('cancel edit and close component');
  }
}
