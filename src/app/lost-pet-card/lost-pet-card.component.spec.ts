import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetCardComponent } from './lost-pet-card.component';

describe('LostPetCardComponent', () => {
  let component: LostPetCardComponent;
  let fixture: ComponentFixture<LostPetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostPetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
