import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'golf-site';
  constructor(private router: Router) {}

  ngOnInit(): void {
    // This is to prevent the success page from resending an email when it has been refreshed.
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (!events.url.includes('/success')) {
          window.localStorage.removeItem('refresh_check');
        }
      }
    });
  }
}
