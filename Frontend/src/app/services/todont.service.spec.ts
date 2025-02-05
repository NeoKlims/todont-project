import { TestBed } from '@angular/core/testing';

import { TodontService } from './todont.service';

describe('TodontService', () => {
  let service: TodontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
