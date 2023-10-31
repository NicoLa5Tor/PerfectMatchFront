import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core'
import { TimeZoneService } from 'src/app/Services/time-zone.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (timeZoneService: TimeZoneService) => timeZoneService.getLanguage(),
      deps: [TimeZoneService],
    }
  ]
})
export class FooterComponent implements OnInit{
constructor(private trans : TranslateService, public timeZoneService: TimeZoneService) {
  this.trans.use('es-CO')
}
setIdiom(idiom : string ){
this.trans.use(idiom);
this.timeZoneService.setLanguage(idiom);
}

ngOnInit() {
}

}
