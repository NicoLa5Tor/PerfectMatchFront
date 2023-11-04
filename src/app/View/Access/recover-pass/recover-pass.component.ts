import { Component, OnInit } from '@angular/core';
import { Email } from "../../../Models/Request/Email";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.css']
})
export class GenerateTokenComponent implements OnInit{
  public email:Email={content:"",email:"",subject:"",domain:""};
  recoverForm!:FormGroup;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  constructor(private _apiuser:LoginService,private _snackbar:MatSnackBar, private readonly fb:FormBuilder) {}
  public ngOnInit(): void {
    this.recoverForm=this.initForm();
    
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  public generateToken():void
  {
      if(this.recoverForm.valid)
      {
        this._apiuser.createToken(this.recoverForm.value ).subscribe(x=>{console.log(x)
          ;this._snackbar.open(x.message,'Done',{
          duration: 5000,
          verticalPosition: "top", // Allowed values are  'top' | 'bottom'
          horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
          panelClass: ['snackbar'] 
          
        })})
      }
  }
  initForm():FormGroup{
  return  this.fb.group({
    email:['',[Validators.required, Validators.email,Validators.minLength(8)]],
    domain:[document.location.origin]
    })
  }
}
