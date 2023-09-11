import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  typesOfShoes = [
    {id: 1, let:'Principal'}, 
    {id: 2,  let: 'Listas'},
    { id: 3, let:'Loafers'},
    { id: 4,  let:'Moccasins'},
    { id: 5  , let :'Sneakers'}];
    constructor(private rout: Router) {
      
    }

ouput! : string;
selectOption(dat: string, num: number){
  this.ouput = dat;
     switch(num){
      case 1:
        this.rout.navigate(['']);
        break;

        case 2:
          this.rout.navigate(['PropertyList']);
          break;
          case 3: 
          this.rout.navigate(['Form']);
            break;
            case 4:
              break;
              case 5:
                break;
     }
}
}
