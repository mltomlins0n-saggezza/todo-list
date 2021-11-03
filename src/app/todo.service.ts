import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      catchError(this.handleError<Todo[]>([]))
    );
  }

  // POST a new todo to the server
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      catchError(this.handleError<Todo>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // return an empty result so the app keeps running
      return of(result as T);
    }
  }
}
