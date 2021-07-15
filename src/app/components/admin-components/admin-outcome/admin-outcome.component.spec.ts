import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOutcomeComponent } from './admin-outcome.component';

describe('AdminOutcomeComponent', () => {
  let component: AdminOutcomeComponent;
  let fixture: ComponentFixture<AdminOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
