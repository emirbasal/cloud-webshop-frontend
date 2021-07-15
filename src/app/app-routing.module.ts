import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart-components/cart/cart.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HomepageComponent } from './components/homepage-components/homepage/homepage.component';
import { ProductDetailComponent } from './components/detail-components/product-detail/product-detail.component';
import { OrderDetailComponent } from './components/detail-components/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailComponent  },
  { path: 'order/:id', component: OrderDetailComponent },
  { path: 'product/create/new', component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
