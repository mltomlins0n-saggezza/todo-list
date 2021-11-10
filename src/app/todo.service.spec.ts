import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } 
from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { TodoService } from './todo.service';
import { TEST_TODOS } from './mock-todos';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  const testUrl = 'api/todos';
  const testItem = { id: 1, name: 'TEST this', isChecked: false };
  const newTestItem = { id: 6, name: 'NEW TEST ITEM', isChecked: false };
  const editedTestItem = { 
    id: 1, 
    name: 'Edited version of TEST this', 
    isChecked: false 
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todos', () => {
    service.getTodos()
      .subscribe(todos => {
        expect(todos).toBeTruthy();
        expect(todos.length).toBe(TEST_TODOS.length);
      });
      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(TEST_TODOS);
  });

  it('should retrieve a todo item by ID', () => {
    service.getTodo(testItem.id)
      .subscribe(todo => {
        expect(todo).toBeTruthy();
        expect(todo.id).toBe(1);
      });
      const req = httpTestingController.expectOne(`${testUrl}/${testItem.id}`)
      expect(req.request.method).toEqual('GET');
      req.flush(testItem);
  });

  it('should POST an item to the server', () => {
    service.addTodo(newTestItem)
      .subscribe(todo => {
        expect(todo).toBeTruthy();
        expect(todo).toEqual(newTestItem);
      });
      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(newTestItem);
  })

  it('should update an items details on the server', () => {
    service.updateTodo(editedTestItem)
      .subscribe(todo => {
        expect(todo).toBeTruthy();
        expect(todo).toEqual(editedTestItem);
      });
      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(editedTestItem);
  })

  it('should DELETE an item from the server', () => {
    service.deleteTodo(testItem.id)
      .subscribe(todo => {
        expect(todo).toEqual(testItem);  
      });
      const req = httpTestingController.expectOne(`${testUrl}/${testItem.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(testItem);
  })

  it('should return an error when an API call fails', () => {
    service.addTodo(newTestItem)
      .subscribe(todo => {
        expect(todo).not.toBeDefined();
      });
      const req = httpTestingController.expectOne(testUrl);
      req.flush('Test error', {status: 400, statusText: 'Bad Request'});
      // req.error(new ErrorEvent('Test error'));
  })
});
