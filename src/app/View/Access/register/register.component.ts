import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/Models/City';
import { ApiCityService } from 'src/app/Services/api-city.services';
import { ApiUserService } from 'src/app/Services/api-user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  dat = false;
  form: FormGroup
  listCity: City[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private rout: Router,
    private cityService: ApiCityService,
    private userService: ApiUserService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      idUser : [0],
      idRole:[0],
      name: ['', Validators.required],
      birthDate:  ['', Validators.required],
      password: ['', Validators.required],
      idCity: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      codePay: ['', Validators.required ]
    })
    this.cityService.getAnimalType().subscribe({
      next: (data) => {
        this.listCity = data;
      }, error: (e) => { }
    })
    this.dat = false
  }
  login() {
    if (this.dat == true) {
      this.rout.navigate(['login'])
      this.dat = false;
    }
  }
}
