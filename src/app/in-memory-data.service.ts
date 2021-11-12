import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const todos = [
      { id: 1, name: 'this', isChecked: false },
      { id: 2, name: 'that', isChecked: false },
      { id: 3, name: 'another thing', isChecked: false },
      { id: 4, name: 'one more thing', isChecked: false },
      { id: 5, name: 'this again', isChecked: false },
    ];
    return { todos };
  }

  constructor() {}
}
