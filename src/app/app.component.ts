import { Component,HostListener,OnInit , Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { PropertyListComponent } from './View/Property/property-list/property-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  action  = false;
 constructor(private rout : Router,
  private tok : ActivatedRoute
 ){
 
  
 }
 ngOnInit(): void {
  const parseo = this.tok.snapshot.paramMap.get('token');
  if(parseo != null){
    this.action = true;
    console.log("accede")
  }else{
    this.rout.navigate(['login'])
  }
 }
}


