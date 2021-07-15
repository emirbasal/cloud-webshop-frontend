import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListEntryComponent } from './product-list-entry.component';

describe('ProductListEntryComponent', () => {
  let component: ProductListEntryComponent;
  let fixture: ComponentFixture<ProductListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
