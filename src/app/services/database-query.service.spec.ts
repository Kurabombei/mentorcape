import { TestBed } from '@angular/core/testing';

import { DatabaseQueryService } from './database-query.service';

describe('DatabaseQueryService', () => {
  let service: DatabaseQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
