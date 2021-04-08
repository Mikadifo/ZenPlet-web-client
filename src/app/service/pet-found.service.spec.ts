import { TestBed } from '@angular/core/testing';

import { PetFoundService } from './pet-found.service';

describe('PetFoundService', () => {
  let service: PetFoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetFoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
