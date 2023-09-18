import { Component,Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet'
import { Publication } from 'src/app/Models/publication';


@Component({
  selector: 'app-link-dialog',
  templateUrl: './link-dialog.component.html',
  styleUrls: ['./link-dialog.component.css']
})
export class LinkDialogComponent {
  model : Publication;
 constructor(
  private button_sheet : MatBottomSheetRef,
  @Inject(MAT_BOTTOM_SHEET_DATA) public data: Publication
 ) {
  this.model = this.data;
 }
 return(){
  this.button_sheet.dismiss();
 }
}
