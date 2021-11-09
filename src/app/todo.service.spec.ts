import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } 
from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { TEST_TODOS } from './mock-todos';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  const testUrl = 'api/todos';

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
        expect(todos.length).toBe(5);
      });

      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(TEST_TODOS);
  });

  it('should retrieve a todo item by ID', () => {
    service.getTodo(1)
      .subscribe(todo => {
        expect(todo).toBeTruthy();
        expect(todo.id).toBe(1);
      });

      const req = httpTestingController.expectOne(`${testUrl}/1`)
      expect(req.request.method).toEqual('GET');
      req.flush(TEST_TODOS[0]);
  });

  // should POST a new item to the server

  // should update an item's details on the server

  // should DELETE an item from the server

  // should return an error when API call fails

});
