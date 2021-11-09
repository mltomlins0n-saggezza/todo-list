import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } 
from '@angular/common/http/testing';

import { InMemoryDataService } from './in-memory-data.service';
import { TEST_TODOS } from './mock-todos';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;
  let httpTestingController: HttpTestingController;

  const testItem = { id: 1, name: 'TEST this', isChecked: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InMemoryDataService]
    });
    service = TestBed.inject(InMemoryDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should generate a new ID for a todo item', () => {
  //   const result = service.genId(TEST_TODOS);
  //   expect(result).toBeGreaterThan(TEST_TODOS.length);
  // })

});
