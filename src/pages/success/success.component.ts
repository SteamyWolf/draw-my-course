import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'success-component',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.removeAllFromCart();

    this.route.queryParams.subscribe((queries) => {
      if (queries['session_id']) {
        this.cartService
          .getCustomerInformationAfterSuccessfulTransaction(
            queries['session_id']
          )
          .subscribe((customer) => {
            console.log(customer);
          });
      }
    });

    this.cartService.sendEmailToZach().subscribe((response) => {
      console.log(response);
    });
  }
}
