import { TestBed } from '@angular/core/testing';

import { RequestsService } from './requests.service';

describe('Requests', () => {
  let service: RequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
