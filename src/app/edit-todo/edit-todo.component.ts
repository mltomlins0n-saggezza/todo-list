import { Component, Input, OnInit } from '@angular/core';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  // @Input() title: string;

  @Input() todo: Todo;

  constructor(private todoService: TodoService) {
    // this.title = '';
    this.todo = {id: 0, name: 'this', isChecked: false};
  }

  ngOnInit(): void {}

  save(): void {
    console.log('save edited todo');
    if (this.todo) {
      this.todoService.updateTodo(this.todo).subscribe();
    }
  }

  cancel(): void {
    console.log('cancel edit and close component');
  }
}
