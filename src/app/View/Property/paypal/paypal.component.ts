import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
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
    private saniticer : DomSanitizer ){
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
      currency: 'EUR',
      clientId: 'ATYQT_15GsfF_aE_Q9KvNJpb4NXSBtu9mkhOxnwtYmKNRnaC6dls0MBLVQO10mEZbJbyLkLz2mkpOHRi',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.model.price.toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.model.price.toString()
              }
            }
          },
          items: [{
            name: 'Compra del animal: '+this.model.animalName,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
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
