import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EditTodoComponent } from './edit-todo.component';
import { TodoService } from '../todo.service';
import { TEST_TODOS } from '../mock-todos';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;

  const testItem = { id: 1, name: 'TEST this', isChecked: false };

  const mockTodoService = jasmine.createSpyObj<TodoService>('TodoService', {
    updateTodo: of(TEST_TODOS),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTodoComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update the name of a list item', () => {
    expect(component.todo.name).toEqual('');
    component.save(testItem.name);
    fixture.detectChanges();
    expect(component.todo.name).toEqual(testItem.name);
  });

  it('should display the name of the todo item in the DOM', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toContain(
      component.todo.name
    );
  });
});
