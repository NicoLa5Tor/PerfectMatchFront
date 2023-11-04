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
  let href = document.location.href.substring(document.location.origin.length,document.location.origin.length + ("/newpassword").length)
  if(href != "/newpassword")
  this.rout.navigate(['principal'])
}
}


