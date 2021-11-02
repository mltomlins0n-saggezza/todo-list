import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  save(): void {
    console.log('save edited todo');
  }

  cancel(): void {
    console.log('cancel edit and close component');
  }
}
