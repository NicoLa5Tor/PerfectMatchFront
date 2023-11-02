import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/Models/Comment';
import { notificationService } from 'src/app/Services/api-notifications.services';
import { ApiUserService } from 'src/app/Services/api-user.service';
import { CommentService } from 'src/app/Services/comment.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() id!:number;
  @Input() listComments!: Comment[]
  commentForm: FormGroup;
  iduser!:number;
  constructor(private fb: FormBuilder,private _apiComment:CommentService, private _user:TokenService,
    private _notiS:notificationService,
    private _user1:ApiUserService,

    ) {
    this.commentForm = this.fb.group({
      commentText: [''],
    });
  }

  ngOnInit(): void {
    if(!this.listComments)
    {
      this._apiComment.getCommentsFromPublication(this.id).subscribe(x=>{this.GroupInListComment(x);
      console.log(this.listComments);
      if(!(this.listComments.length>0))
      {this.listComments=[{comment1:"Se el primero en comentar",comments: [],idComment:0,idPublication:this.id,
      idUser:0,nameOwnerComment:"",nameOwnerPublication:"",nameUser:"",isSon:false}];}
    });
    }
      
  }

  addComment(comment: Comment) {
    const newComment = this.commentForm.get('commentText')?.value;
    let comment1:Comment = {
      idComment: 0,
      idPublication: comment.idPublication,
      idUser: this._user.getIdUser(),
      comment1: newComment,
      nameOwnerComment: comment.nameUser,
      nameOwnerPublication: comment.nameOwnerPublication,
      nameUser:"",
      idCommentFk:comment.idComment==0?undefined:comment.idComment,
      comments: []};

    this.commentForm.get('commentText')?.setValue(''); // Limpia el campo después de agregar el comentario
    console.log(comment1)
    this._user1.getCompleteUser(this.iduser).subscribe(x=>{
      comment1.nameUser=x.name;
        this._apiComment.addComment(comment1).subscribe(x=>{
          if(x){
            comment1.idComment=x.idComment;
            if(comment1.idCommentFk)
            {comment.comments.push(comment1);}
            else{
              comment.comment1 = comment1.comment1
              comment.nameUser = comment1.nameUser
            }
            this._user1.getCompleteUser(this.iduser).subscribe(x=>{

              this._notiS.setNotification({
                accessLink: "", idNotification: 0, idPublication: (comment.idPublication), idUser:comment.idUser ,idUserFK:this.iduser,
                imagePublication: "", nameUser: "", nameUserFK:"",namePublication: "", state: 0,
                typeNotification: 2,namePublication1:"",description1:""
              }).subscribe(x=>{})
              
            })
          }});
     })
  }
  GroupInListComment(listComments:Comment[]){
    let listNC:Map<number,Comment[]> = new Map<number,Comment[]>() ;
    let listcomment1:Comment[]=[];
    listComments.forEach(x=>{
      if(x.idCommentFk)
      {
        let subArray = listNC.get(x.idCommentFk);
        if(subArray)
        {
          subArray.push(x);
          listNC.set(x.idCommentFk,subArray);
        }
        else listNC.set(x.idCommentFk,[x]);
      }
      else listcomment1.push(x);
    });
    this.GroupSubComments(listcomment1,listNC);
    this.listComments= listcomment1;
    console.log(this.listComments)
  }
  private GroupSubComments(listComments:Comment[],listNC:Map<number,Comment[]>){

    listComments.forEach(x=>{
      let subcomment = listNC.get(x.idComment);
      if(subcomment)
       { x.comments=subcomment;
        this.GroupSubComments(x.comments,listNC);}else{
          x.comments=[];
        }
    });
  }
}

