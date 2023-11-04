import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ResponseLogin } from 'src/app/Models/ResponseLogin';
import { LoginService } from 'src/app/Services/login.service';
import { Login } from 'src/app/Models/Login';
import { EncryptXOR } from 'src/app/Models/Encryption';
import { TokenService } from 'src/app/Services/token.service';
import {TranslateService} from '@ngx-translate/core';
import { ApiUserService } from 'src/app/Services/api-user.service';
import { Carousel, initTE } from "tw-elements";
import { MatSnackBar } from '@angular/material/snack-bar';


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
  currentIndex: number = 1;
  images: string[] = [
    'assets/loginBack.png',
    'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
    'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
  ];
  constructor(private actRout: ActivatedRoute, private rout: Router, private fb: FormBuilder,
     private serviceLog: LoginService, private tok: TokenService, private trans : TranslateService, private user : ApiUserService, private _snackBar :MatSnackBar) {
    const state  = this.rout.getCurrentNavigation()?.extras.state;
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    if(state){
    this.log = state["loginModel"];
    }
    initTE({
      Carousel,
    });
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
            this.rout.navigate(['/principal']);
            //  localStorage.setItem('token_user',data.token);      
            //console.log("datos ", this.token)
          } else {
            this.messageAlert("Algo salió mal ", "¡contraseña incorrecta!")
            console.log("usuario no exitente")
          }

        }, error: (er) => {
          this.messageAlert("Algo salió mal ", "¡usiario o contraseña incorrecto!")
        }
      })
     
    }


  }
  messageAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: "top",
      horizontalPosition: "center",
      duration: 3000,
    })
  }
  previous() {
    if (this.currentIndex > 1) {
      this.currentIndex = this.currentIndex - 1;
    }
  }

  forward() {
    if (this.currentIndex < this.images.length) {
      this.currentIndex = this.currentIndex + 1;
    }
  }
}

