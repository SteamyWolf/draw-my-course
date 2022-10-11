import { Component } from '@angular/core';

@Component({
  selector: 'staggered-section-component',
  templateUrl: './staggered-section.component.html',
  styleUrls: ['./staggered-section.component.scss'],
})
export class StaggeredSectionComponent {
  staggereds: { header: string; text: string; src: string }[] = [
    {
      header: 'This is an example header',
      text: 'This is just example text to show that there is some default text here which is pretty cool ya know',
      src: 'https://cdn.shopify.com/s/files/1/0269/2638/3184/products/CustomCourseMapOnTable_1445x.jpg?v=1649410097',
    },
    {
      header: 'This is an example header 2',
      text: 'This is just example text to show that there is some default text here which is pretty cool ya know',
      src: 'https://i.pinimg.com/originals/b7/5a/ea/b75aeafb5e0e8edb74795cbce9e27875.png',
    },
  ];
  constructor() {}
}
