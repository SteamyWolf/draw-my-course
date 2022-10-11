import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feature-section',
  templateUrl: './feature-section.component.html',
  styleUrls: ['./feature-section.component.scss'],
})
export class FeatureSectionComponent implements OnInit {
  features = [
    {
      icon: 'golf_course',
      header: 'Custom Canvas',
      text: 'random paragraph text that will go here and will make the site look amazing in all the ways is the way to go dude! And even more text here to practice my typography and make this golf site the most amazing site to ever exist',
    },
    {
      icon: 'sports_golf',
      header: 'Letter Printed',
      text: 'random paragraph text that will go here and will make the site look amazing in all the ways is the way to go dude! And even more text here to practice my typography and make this golf site the most amazing site to ever exist',
    },
    {
      icon: 'space_dashboard',
      header: 'Physical or Digital',
      text: 'random paragraph text that will go here and will make the site look amazing in all the ways is the way to go dude! And even more text here to practice my typography and make this golf site the most amazing site to ever exist',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
