export interface Comment{
    
    idComment:number,
    idPublication?:number,
    idUser:number,
    idCommentFk ?:number,
    comment1 :string,
    nameOwnerComment :string, 
    nameOwnerPublication:string,
    nameUser :string,
    comments :Comment[]
    isSon?:boolean
}