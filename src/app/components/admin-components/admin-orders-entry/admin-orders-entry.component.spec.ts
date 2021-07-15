import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersEntryComponent } from './admin-orders-entry.component';

describe('AdminOrdersEntryComponent', () => {
  let component: AdminOrdersEntryComponent;
  let fixture: ComponentFixture<AdminOrdersEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdersEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
