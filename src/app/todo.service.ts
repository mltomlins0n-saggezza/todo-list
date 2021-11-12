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
  private http: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(http: HttpClient) {
    this.http = http;
  }

  // GET a todo item by ID
  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(catchError(this.handleError<Todo>()));
  }

  // GET all todo items
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.todosUrl)
      .pipe(catchError(this.handleError<Todo[]>([])));
  }

  // POST a new todo to the server
  addTodo(todo: Todo): Observable<Todo> {
    todo.id = this.genId(10, 10000);
    return this.http
      .put<Todo>(this.todosUrl, todo, this.httpOptions)
      .pipe(catchError(this.handleError<Todo>()));
  }

  // PUT the edited todo details on the server
  updateTodo(todo: Todo): Observable<any> {
    return this.http
      .put(this.todosUrl, todo, this.httpOptions)
      .pipe(catchError(this.handleError<any>()));
  }

  // DELETE a todo from the server
  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http
      .delete<Todo>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Todo>()));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // return an empty result so the app keeps running
      return of(result as T);
    };
  }

  genId(min: number, max: number): number {
    // converts number to a string in base 32
    // and takes the numbers after the decimal point
    // Math.random().toString(32).substr(2, 9);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
