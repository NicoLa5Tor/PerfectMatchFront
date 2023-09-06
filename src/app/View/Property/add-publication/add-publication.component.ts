import { Component } from '@angular/core';
import { Publication } from 'src/app/Models/publication';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {
  /**
   *
   */
// Example starter JavaScript for disabling form submissions if there are invalid fields
 const =(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


  constructor(private _apipublication:ApiPublicationService) {}
  
   imgs:Array<string>=new Array<string>(5);
   numImg:number=0;
   publication:Publication={animalName:"",Images:[""]};
  saveData()
  {
    console.log(this.publication);
    this._apipublication.AddPublications(this.publication);
  }
  
  getImage(event:any,num :number)
  {
    this.numImg=num;
    this.imgToBase64(event.target.files[0]);
  }
  private imgToBase64(file: Blob) {
    if (file) {
      const reader = new FileReader();
      
      reader.onload = this.toBase64.bind(this);
      
      reader.readAsBinaryString(file);
      return file;
    }
    return null;
  }
  toBase64(e : any) {
    this.publication.Images[this.numImg]= ( btoa(e.target.result));
  }
  
}

