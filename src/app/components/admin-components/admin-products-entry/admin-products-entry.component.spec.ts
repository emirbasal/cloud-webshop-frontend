import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsEntryComponent } from './admin-products-entry.component';

describe('AdminProductsEntryComponent', () => {
  let component: AdminProductsEntryComponent;
  let fixture: ComponentFixture<AdminProductsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
