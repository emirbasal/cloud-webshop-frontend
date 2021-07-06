import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemListEntryComponent } from './cart-item-list-entry.component';

describe('CartItemListEntryComponent', () => {
  let component: CartItemListEntryComponent;
  let fixture: ComponentFixture<CartItemListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
