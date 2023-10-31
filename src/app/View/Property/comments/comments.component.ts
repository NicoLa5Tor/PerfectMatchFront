import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/Models/Comment';
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
  constructor(private fb: FormBuilder,private _apiComment:CommentService, private _user:TokenService) {
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
      nameUser:"Andres",
      idCommentFk:comment.idComment==0?undefined:comment.idComment,
      comments: []};

    this.commentForm.get('commentText')?.setValue(''); // Limpia el campo después de agregar el comentario
    console.log(comment1)
    this._apiComment.addComment(comment1).subscribe(x=>{
      if(x){
        comment1.idComment=x.idComment;
        if(comment1.idCommentFk)
        {comment.comments.push(comment1);}
        else{
          comment.comment1 = comment1.comment1
          comment.nameUser = comment1.nameUser
        }

      }});
    
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

