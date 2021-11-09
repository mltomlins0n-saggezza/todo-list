import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../todo.service';
import { TEST_TODOS, TODOS } from '../mock-todos';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const testItem = { id: 1, name: 'TEST this', isChecked: false };
  const testItem2 = { id: 2, name: 'TEST this item too', isChecked: true };

  beforeEach(async () => {
    const mockTodoService = jasmine.createSpyObj<TodoService>('TodoService', {
      getTodos: of(TEST_TODOS),
      addTodo: of(testItem),
      deleteTodo: of(testItem),
    });

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list with the first item being "TEST this"', () => {
    expect(component.todos).toEqual(TEST_TODOS);
  });

  it('should NOT have a list with the first item being "this"', () => {
    expect(component.todos).not.toEqual(TODOS);
  });

  it('should add an item to the list', () => {
    component.add(testItem.name);
    fixture.detectChanges();
    expect(component.todos).toContain(testItem);
  });

  it('should delete an item from the list', () => {
    expect(component.todos).toEqual(TEST_TODOS);
    component.delete(testItem);
    fixture.detectChanges();
    expect(component.todos).not.toContain(testItem);
  });

  it('should show the edit component', () => {
    expect(component.isVisible).toBeFalsy();
    component.openEditView(testItem);
    fixture.detectChanges();
    expect(component.isVisible).toBeTruthy();
    expect(component.editedTodo).toEqual(testItem);
  });

  it('should display the name of the todo item in the edit component', () => {
    component.edit(testItem.name);
    fixture.detectChanges();
    expect(component.editedTodo.name).toEqual(testItem.name);
  });

  it('should show the edit component for each item clicked', () => {
    component.openEditView(testItem);
    expect(component.editedTodo).toEqual(testItem);
    fixture.detectChanges();
    component.openEditView(testItem2);
    expect(component.editedTodo).toEqual(testItem2);
    expect(component.editedTodo).not.toEqual(testItem);
  })

  it('should add, edit, then delete an item', () => {
    component.add(testItem.name);
    expect(component.todos).toContain(testItem);

    component.openEditView(testItem);
    expect(component.isVisible).toBeTruthy();
    expect(component.editedTodo).toEqual(testItem);

    component.edit(testItem.name);
    expect(component.editedTodo.name).toEqual(testItem.name);

    component.delete(testItem);
    expect(component.todos).not.toContain(testItem);
  })
});
