import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from 'src/pages/homepage/homepage.component';
import { AboutComponent } from 'src/pages/about/about.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { AdminComponent } from 'src/admin/admin.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { HeroComponent } from 'src/components/hero/hero.component';
import { ProductGalleryComponent } from 'src/pages/product-gallery/product-gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeatureSectionComponent } from '../components/feature-section/feature-section.component';
import { StaggeredSectionComponent } from 'src/components/staggered-section/staggered-section.component';
import { FooterComponent } from 'src/components/footer/footer.component';
import { CartComponent } from 'src/pages/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutComponent,
    NavbarComponent,
    HeroComponent,
    ProductGalleryComponent,
    AdminComponent,
    FeatureSectionComponent,
    StaggeredSectionComponent,
    FooterComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    HttpClientModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
