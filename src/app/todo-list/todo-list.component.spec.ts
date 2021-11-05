import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../todo.service';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: Partial<TodoService>;

  beforeEach(async () => {
    // mockTodoService = {
    //   id: 0,
    //   name: 'test todo item',
    //   isChecked: false
    // };

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    mockTodoService = fixture.debugElement.injector.get(TodoService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
