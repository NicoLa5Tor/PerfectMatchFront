import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPass } from 'src/app/Models/Request/NewPass';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
newpass : NewPass = {pass:"",pass2:"",token:""};
formNPass!:FormGroup;
constructor(private _apiuser:LoginService,private _route : ActivatedRoute,private snackBar: MatSnackBar,private _route1:Router,
            private _formBuilder:FormBuilder) {}

  public ngOnInit(): void {
    this._route.queryParams
      .subscribe(params => {
        if(params['token']!=null)
        this.initForm(params['token']);
      else this.initForm('');
        this.ShowSnackToken();
      });
      

  }
  
  initForm(token1:string)
  {
    this.formNPass= this._formBuilder.group({
      pass:['',[Validators.required,Validators.minLength(8)]],
      pass2:['',[Validators.required,Validators.minLength(8)]],
      token:[token1]
    });
  }

  ShowSnackToken() {
    this._apiuser.validateToken(this.formNPass.get("token")?.value).subscribe(x1=>{
   this.snackBar.open(x1.message,'Done' ,{
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass:['snackbar']
    }).afterDismissed().subscribe(x=>{
      if(x1.state!=1){this._route1.navigateByUrl("/login");}

    
    })});
  }
  public updatePass(){
    if(this.formNPass.valid){
      if(this.formNPass.get("pass")?.value!=""&&this.formNPass.get("pass2")?.value!=="")
      this._apiuser.updatePass(this.formNPass.value).subscribe(x=>{this.snackBar.open(x.message,'Done',{
        duration: 3000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      }).afterDismissed().subscribe(x=>{this._route1.navigateByUrl("/login")})});
    }else{
      this.snackBar.open("El form no es valido",'Done',{
        duration: 3000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      }).afterDismissed();
    }
  }
}
