import { Component, OnInit } from '@angular/core';

import { TODOS } from '../mock-todos';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos = TODOS;
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  edit(): void {
    console.log('Item details will be edited here');
    this.isVisible = !this.isVisible;
  }

  delete(): void {
    console.log('Item will be deleted here');
  }

  markDone(): void {
    console.log('Item will be marked as done here')
  }

}
