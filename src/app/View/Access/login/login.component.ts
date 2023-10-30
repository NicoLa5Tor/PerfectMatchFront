import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseLogin } from 'src/app/Models/ResponseLogin';
import { LoginService } from 'src/app/Services/login.service';
import { Login } from 'src/app/Models/Login';
import { EncryptXOR } from 'src/app/Models/Encryption';
import { TokenService } from 'src/app/Services/token.service';
import {TranslateService} from '@ngx-translate/core';
import { ApiUserService } from 'src/app/Services/api-user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit{
  obj!: ResponseLogin;
  form!: FormGroup;
  log! : Login;
  private token!: string;
  constructor(private actRout: ActivatedRoute, private rout: Router, private fb: FormBuilder,
     private serviceLog: LoginService, private tok: TokenService, private trans : TranslateService, private user : ApiUserService) {
    const state  = this.rout.getCurrentNavigation()?.extras.state;
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    if(state){
    this.log = state["loginModel"];
    }
  }
  ngOnInit(): void {
    if(this.log != null){
     this.form.patchValue({
      email : this.log.email,
      password : this.log.password
     })
    }
  }
 

  onClick() {
    if (this.form.valid) {
      const model: Login = {
        email: this.form.value.email,
        password: EncryptXOR(this.form.value.password)
      }

      this.serviceLog.LoginAuthenticate(model).subscribe({
        next: (data) => {
          if (data.result) {
            this.tok.setToken(data.token,"Token")
            this.tok.setToken(data.refreshToken, "Refresh")
            //  localStorage.setItem('token_user',data.token);
          
            this.user.getUser(this.tok.getId()).subscribe({
              next:(data) => {
                console.log("EL rol es: ",data);
              }
            })
            //console.log("datos ", this.token);
            this.rout.navigate(['principal']);
            
          } else {
            console.log("usuario no exitente")
          }

        }, error: (er) => {

        }
      })
    }


  }
}

