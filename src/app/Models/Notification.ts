export interface Notification{
    idNotification ?: number,
    idUser : number,
    idUserFK :number,
    idMovement ?: number,
    idPublication ?: number,
    nameUser : string,
    nameUserFK :string,
    namePublication : string,
    namePublication1:string,
    imagePublication : string,
    description? : string,
    description1?:string,
    date ?: string,
    state : number,
    accessLink: string,
    typeNotification:number
}