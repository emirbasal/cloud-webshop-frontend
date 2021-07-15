import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListEntryComponent } from './components/product-list-entry/product-list-entry.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartItemListComponent } from './components/cart-item-list/cart-item-list.component';
import { CartItemListEntryComponent } from './components/cart-item-list-entry/cart-item-list-entry.component';
import { CartUserInformationComponent } from './components/cart-user-information/cart-user-information.component';
import { IconComponent } from './components/icon/icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    ProductListComponent,
    ProductListEntryComponent,
    ProductDetailComponent,
    CartComponent,
    CartItemListComponent,
    CartItemListEntryComponent,
    CartUserInformationComponent,
    IconComponent,
    OrderDetailComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
