import { TestBed } from '@angular/core/testing';

import { PetVaccinesService } from './pet-vaccines.service';

describe('PetVaccinesService', () => {
  let service: PetVaccinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetVaccinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
