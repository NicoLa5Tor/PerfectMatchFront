import { Component } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  dat = false;
  email = new FormControl('', [Validators.required, Validators.email]);
constructor(private rout : Router){
  this.dat = false
}


getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}
login(){
  if(this.dat == true){
  this.rout.navigate(['login'])
  this.dat = false;
}
}
}
