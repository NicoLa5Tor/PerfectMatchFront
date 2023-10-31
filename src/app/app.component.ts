import { Component,HostListener,OnInit , Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  action  = false;
 constructor(private rout : Router,
  private tok : ActivatedRoute,


 ){
 
//  transt.setIdiomDefault();
 }
 ngOnInit(): void {
this.rout.navigate(['principal'])
}
}


