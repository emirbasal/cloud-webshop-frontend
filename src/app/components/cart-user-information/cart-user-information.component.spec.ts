import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartUserInformationComponent } from './cart-user-information.component';

describe('CartUserInformationComponent', () => {
  let component: CartUserInformationComponent;
  let fixture: ComponentFixture<CartUserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartUserInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
