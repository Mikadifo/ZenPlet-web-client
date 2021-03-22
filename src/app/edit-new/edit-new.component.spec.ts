import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewComponent } from './edit-new.component';

describe('EditNewComponent', () => {
  let component: EditNewComponent;
  let fixture: ComponentFixture<EditNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
