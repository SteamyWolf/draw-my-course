import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/admin/admin.component';
import { AboutComponent } from 'src/components/about/about.component';
import { HomePageComponent } from 'src/components/homepage/homepage.component';
import { ProductGalleryComponent } from 'src/components/product-gallery/product-gallery.component';

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
