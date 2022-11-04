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
    if (!window.localStorage.getItem('refresh_check')) {
      const customer_bought_items =
        this.cartService.getAllCartProductsFromLocalStorage();
      this.cartService.removeAllFromCart();

      this.route.queryParams.subscribe((queries) => {
        if (queries['session_id']) {
          this.cartService
            .getCustomerInformationAfterSuccessfulTransaction(
              queries['session_id']
            )
            .subscribe((session: any) => {
              if (
                session.payment_status === 'paid' &&
                session.status === 'complete'
              ) {
                const email_details = {
                  status: session.status,
                  customer_name: session.customer_details.name,
                  customer_email: session.customer_details.email,
                  customer_address: session.customer_details.address,
                  customer_bought_items,
                };
                this.cartService
                  .sendRequestEmail(email_details)
                  .subscribe((response) => {
                    window.localStorage.setItem('refresh_check', 'true');
                  });
              }
            });
        }
      });
    }
  }
}
