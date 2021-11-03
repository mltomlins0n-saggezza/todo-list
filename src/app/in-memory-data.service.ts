import { Injectable } from '@angular/core';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const todos = [
      { id: '1', name: 'this', isChecked: false },
      { id: '2', name: 'that', isChecked: false },
      { id: '3', name: 'another thing', isChecked: false },
      { id: '4', name: 'one more thing', isChecked: false },
      { id: '5', name: 'this again', isChecked: false },
    ];
    return { todos };
  }

  genId(todos: Todo[]): number {
    // converts number to a string in base 32
    // and takes the numbers after the decimal point
    // use to generate random ids?
    // Math.random().toString(32).substr(2, 9);
    return todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0;
  }

  constructor() {}
}
