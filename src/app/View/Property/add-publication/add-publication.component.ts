import { Component } from '@angular/core';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {
  public image:string="";
   public Img:any="";
   imgs:Array<string>=[];
  saveData(event:any)
  {
    console.log(event);
    //this.imgToBase64(this.Img);
    console.log(this.Img);
    console.log(this.Img);
  }
  
  getImage(event:any)
  {
    this.Img = event.target.files[0];
    this.imgToBase64(this.Img);
    
    console.log(this.Img);
    this.image=(this.Img);
    this.image=(this.Img.arguments);
    blob:Blob;
    Blob.arguments;
    console.log(typeof(this.image))
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
    this.image=('data:image/png;base64,' + btoa(e.target.result));
  }
  
  /*extraerBase64 = async (file:any) =>  new Promise((resolve,reject)=>{
    try{
      const unsafeImg = file;
      //const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL(unsafeImg);
      reader.onload = () => {
        resolve({
          blob:file,
          base:null
        })
      }
    }catch(e){
      return null;
    }
  })*/
}
