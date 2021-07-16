import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/ui-components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage-components/homepage/homepage.component';
import { CartComponent } from './components/cart-components/cart/cart.component';
import { ProductListComponent } from './components/homepage-components/product-list/product-list.component';
import { ProductListEntryComponent } from './components/homepage-components/product-list-entry/product-list-entry.component';
import { ProductDetailComponent } from './components/detail-components/product-detail/product-detail.component';
import { CartItemListComponent } from './components/cart-components/cart-item-list/cart-item-list.component';
import { CartItemListEntryComponent } from './components/cart-components/cart-item-list-entry/cart-item-list-entry.component';
import { CartUserInformationComponent } from './components/cart-components/cart-user-information/cart-user-information.component';
import { IconComponent } from './components/ui-components/icon/icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderDetailComponent } from './components/detail-components/order-detail/order-detail.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AdminOrdersEntryComponent } from './components/admin-components/admin-orders-entry/admin-orders-entry.component';
import { AdminOrdersComponent } from './components/admin-components/admin-orders/admin-orders.component';
import { AdminOutcomeComponent } from './components/admin-components/admin-outcome/admin-outcome.component';
import { AdminOverviewComponent } from './components/admin-components/admin-overview/admin-overview.component';
import { AdminProductsEntryComponent } from './components/admin-components/admin-products-entry/admin-products-entry.component';
import { AdminProductsComponent } from './components/admin-components/admin-products/admin-products.component';
import { AuthenticationComponent } from './components/authentication/authentication/authentication.component';
import { AuthGuardService } from './services/auth-guard.service';



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
    CreateProductComponent,
    AdminOrdersEntryComponent,
    AdminOrdersComponent,
    AdminOutcomeComponent,
    AdminOverviewComponent,
    AdminProductsEntryComponent,
    AdminProductsComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000}),
    NgxLoadingModule.forRoot({ backdropBorderRadius: '3px' }),

  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
