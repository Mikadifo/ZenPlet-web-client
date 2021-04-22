import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsFoundCounterComponent } from './pets-found-counter.component';

describe('PetsFoundCounterComponent', () => {
  let component: PetsFoundCounterComponent;
  let fixture: ComponentFixture<PetsFoundCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetsFoundCounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsFoundCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
