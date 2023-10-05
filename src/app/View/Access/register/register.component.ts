import { Component,HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { City } from 'src/app/Models/City';
import { ApiCityService } from 'src/app/Services/api-city.services';
import { User } from 'src/app/Models/User';
import { ApiUserService } from 'src/app/Services/api-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register = true;
  hide = true;
  dat = false;
  next = false;
  group1 = true;
  e = 0;
  g = 0;
  col = 0;
  form: FormGroup
  listCity: City[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private rout: Router,
    private cityService: ApiCityService,
    private userService: ApiUserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      idUser: [0],
      idRole: [0],
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', [Validators.required, this.minlengthValidator(6)]],
      idCity: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      codePay: ['', Validators.required]
    })
    this.cityService.getAnimalType().subscribe({
      next: (data) => {
        this.listCity = data;
      }, error: (e) => { }
    })
    this.dat = false
    this.updateCol();
  }
  messageAlert(message: string, action: string) {
    this._snackBar.open(message, action,{
      verticalPosition: "top",
      horizontalPosition:"center",
      duration: 3000
    });
  }
  minlengthValidator(minlength: number) {
    return (control: AbstractControl) => {
      if (control.value && control.value.length < minlength) {
        return { minlength: true };
      }
      return null;
    };
  }
  addUser() {
    if (this.form.valid) {
      const model: User = {
        idUser: 0,
        idRole: 3,
        nameRole: '',
        name: this.form.value.name,
        birthDate: moment(this.form.value.birthDate).format("DD/MM/YYYY"),
        idAccess: 0,
        password: this.form.value.password,
        idCity: this.form.value.idCity,
        nameCity: '',
        email: this.form.value.email,
        codePay: this.form.value.codePay
      }
      this.userService.addUser(model).subscribe(
        {
          next:(data) => {
            this.messageAlert("¡Bienvenido a PeTFectMatch!","🐎");
            this.rout.navigate(['login']);
            console.log("datos ingresados con exito: "+data);
          },error:(e) => {
            this.messageAlert("¡Algo salío mal!","");
          }
        }
      )
      console.log("los datos son: " + model.birthDate)
    } else {
      console.log("No hya datos entonces no imprime")
    }
  }
  login() {
  
      this.rout.navigate(['login'])
 
    
  }
  @HostListener('window:resize',['$event'])
  onResize(event: Event){
   this.updateCol();
  }
  updateCol(){
    if(window.innerWidth < 768){
      this.col = 1; 
      this.next = false;
      this.group1 = true;
    }else{
      this.col = 2;
      this.next = true;
      this.group1 = true;
    }
  }
  otherOptionsRegister(){
    if(this.minformTrue()){
       this.group1 = false;
       this.next = true;
    }else{
      this.messageAlert('llene los campos correctamente ', '');
    }
  }
  minformTrue() : Boolean{
    
    
    const emailValidate = this.form.get('email')?.valid;
    const passwordValidate = this.form.get('password')?.valid;
    const nameValidate = this.form.get('name')?.valid;
    if(emailValidate && passwordValidate && nameValidate){
      return true;
    }else{
      return false;
    }
  }
}
