import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../../service/api.service';
import { SharedService } from '../../../service/shared.service';
import { AuthService } from '../../../auth/auth.service';

import { environment } from '../../../../environments/environment';
const BACKEND_URL = environment.apiEndpoint;

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  pic: string;
  imgURL: string;
  @Input() custEmail;
  @Input() cartProducts;
  @Output() isCartChanged = new EventEmitter<any>();

  constructor(
    private apiService: APIService,
    private sharedService: SharedService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.imgURL = BACKEND_URL + environment.IMAGE_PATH;
  }

  ngOnInit() {
  }

  checkPath(imgsrc): string {
    if (imgsrc === undefined || imgsrc === '') {
      this.pic = 'empty_product.svg';
    } else {
      this.pic = imgsrc;
    }
    return this.pic;
  }

  product_add(id, price, qty) {
    qty += 1;
    console.log(id, price, qty);
    this.apiService.productAddToBuy(this.custEmail, id, price, qty).subscribe(data => {
      this.isCartChanged.next(true);
    });
  }

  product_delete(id, price, qty) {
    qty -= 1;
    this.apiService.productDeleteToBuy(this.custEmail, id, price, qty).subscribe(data => {
      this.isCartChanged.next(true);
    });
  }

  product_remove_fromcart(id) {
    this.apiService.productRemoveFromCart(this.custEmail, id).subscribe(data => {
      this.isCartChanged.next(true);
    });
  }

}
