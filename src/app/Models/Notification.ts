export interface Notification{
    idNotification : number,
    idUser : number,
    idPublication : number,
    nameUser : string,
    namePublication : string,
    imagePublication : string,
    description? : string,
    date : string,
    state : number,
    accessLink: string,
    typeNotification:number
}