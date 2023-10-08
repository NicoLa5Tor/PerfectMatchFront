import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/Models/ResponseLogin';
import { LoginService } from 'src/app/Services/login.service';
import { Login } from 'src/app/Models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  obj!: ResponseLogin;
  form: FormGroup;
  constructor(private rout: Router, private fb: FormBuilder, private serviceLog: LoginService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }
 
  onClick() {
    if (this.form.valid) {
      const model : Login = {
        email : this.form.value.email,
        password : this.form.value.password
      }
      this.serviceLog.LoginAuthenticate(model).subscribe({
        next: (data) => {
          if(data.result){
            localStorage.setItem('token_user',data.token);
            console.log("datos ", data);
            this.rout.navigate(['principal']);
          }else{
            console.log("usuario no exitente")
          }
          
        }, error: (er) => {

        }
      })
    }


  }
}
