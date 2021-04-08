import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetPrintableComponent } from './lost-pet-printable.component';

describe('LostPetPrintableComponent', () => {
  let component: LostPetPrintableComponent;
  let fixture: ComponentFixture<LostPetPrintableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostPetPrintableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPetPrintableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
