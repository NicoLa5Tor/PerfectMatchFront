import { Component, AfterViewInit } from '@angular/core';
import { ErrorCom } from 'src/app/Models/Error';
import { ErrorService } from 'src/app/Services/Error.Service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements AfterViewInit{
model : ErrorCom;
constructor(private error : ErrorService, private trans : TranslateService )
{
this.model = this.error.getComponent();
}
ngAfterViewInit(): void {
  this.trans.onLangChange.subscribe((event) => {
    this.model = this.error.getComponent();
  })
}
}
