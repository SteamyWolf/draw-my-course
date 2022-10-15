import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/admin/admin.component';
import { ProductViewComponent } from 'src/components/product-view/product-view.component';
import { AboutComponent } from 'src/pages/about/about.component';
import { CartComponent } from 'src/pages/cart/cart.component';
import { HomePageComponent } from 'src/pages/homepage/homepage.component';
import { ProductGalleryComponent } from 'src/pages/product-gallery/product-gallery.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'products',
    component: ProductGalleryComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'product/:id',
    component: ProductViewComponent,
  },
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
