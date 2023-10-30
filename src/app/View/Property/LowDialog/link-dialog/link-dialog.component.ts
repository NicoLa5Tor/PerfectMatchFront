import { Component, Inject, AfterViewInit, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'
import { Publication } from 'src/app/Models/publication';
import { TranslatService } from 'src/app/Services/Translate.service';
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';
import { ta } from 'date-fns/locale';

@Component({
  selector: 'app-link-dialog',
  templateUrl: './link-dialog.component.html',
  styleUrls: ['./link-dialog.component.css']
})
export class LinkDialogComponent implements AfterViewInit, OnInit{
  model: Publication;
  price : any;
  constructor(
    private button_sheet: MatBottomSheetRef,
    private trans: TranslatService,
    private trns: TranslateService,
  @Inject(MAT_BOTTOM_SHEET_DATA) public data: Publication
  ) {
    this.model = this.data;
  }
  ngOnInit(): void {
    this.price = this.model.price;
    const current = this.trns.currentLang;
    if(current != 'es-CO'){
        this.translate();
        this.model.price = this.trans.translatePrice(this.price);  
    }
  }
  ngAfterViewInit(): void { 
  
  }
  return() {
    this.button_sheet.dismiss();
  }
  translate() {
    let target = this.trns.currentLang;
    let dat = true;
    switch(target){
      case 'es-CO':
        this.model.description = this.data.description;
        dat = false;
        break;
      case  'pt-PT':
        target = 'pt';
        break;
    }
    if(dat){
      this.trans.translate(this.model.description,target).subscribe({
        next: (date) => {
          console.log("Transtalte: ",date)
          this.model.description = date.data.translatedText
          ;
  
        }
      })
    }
   
  }
}
