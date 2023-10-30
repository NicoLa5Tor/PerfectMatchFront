import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";



@Injectable({
    providedIn:"root"
})
export class MessageService{
     _snackBar = inject(MatSnackBar);
    messageAlert(message: string, action: string) {
        this._snackBar.open(message, action, {
          verticalPosition: "top",
          horizontalPosition: "center",
          duration: 3000,
        });
      }
}