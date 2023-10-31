import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { Publication } from 'src/app/Models/publication';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})

export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  imgUrl: SafeResourceUrl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public model: Publication,
    private saniticer : DomSanitizer, private trans : TranslateService ){
      const img = 'assets/logo.png';
      this.imgUrl = this.saniticer.bypassSecurityTrustResourceUrl(img);
  }
  ngOnInit(): void {
    if (this.model != null) {
      this.initConfig()
    }

  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVlpr414SIotZKY99Sm1RLN2nyKOYdF1fr4cGnmzDy4D9zGjU0tgfdAhn1TYqjTVNNcyueSwNVx4Wp2F',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.model.price.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.model.price.toString()
              }
            }
          },
          items: [{
            name: ''+this.model.animalName,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: this.model.price.toString(),
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
}
