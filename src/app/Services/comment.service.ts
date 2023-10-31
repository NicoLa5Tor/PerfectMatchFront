import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment } from "../Models/Comment";




@Injectable({
    providedIn: 'root'
  })
  export class CommentService {
    endPoint : String = enviroment.endPoint;
    url : string = this.endPoint + "Comment/";
  
    constructor(private _http : HttpClient) {
  
     }
     getCommentsFromPublication(idPublication:number):Observable<Comment[]>{
       return this._http.get<Comment[]>(this.url+"GetCommentsOfPublication/"+idPublication);
     }
     addComment(comment:Comment):Observable<Comment>{
      return this._http.post<Comment>(this.url+"Add",comment)
     }
    }