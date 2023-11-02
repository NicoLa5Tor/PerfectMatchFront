import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Notification } from 'src/app/Models/Notification';
import { notificationService } from 'src/app/Services/api-notifications.services';
import { TokenService } from 'src/app/Services/token.service';
import { enviroment } from 'src/app/enviroments/enviroment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
private hubConnection: HubConnection;
public notifications:Notification[]=[];
endPoint : string = enviroment.endPoint;
constructor(private _apiNotification:notificationService,
  private tok: TokenService) {
  this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.endPoint+"chatHub") // La misma ruta que configuraste en el servidor
    .build();
console.log(this.endPoint+"chatHub");
  this.hubConnection.start()
    .then(() => console.log("Conectado a SignalR"))
    .catch(err => console.error("Error de SignalR: " + err));

  this.hubConnection.on("ReceiveMessage", (user: Notification, message: string) => {
    console.log(user);
    this._apiNotification.getNotifications(this.tok.getIdUser()).subscribe(x=>{this.notifications=x;});
  });
  
  this._apiNotification.getNotifications(this.tok.getIdUser()).subscribe(x=>{this.notifications=x;console.log(x)});
}

// Método para enviar mensajes al servidor
public sendMessage(user: string, message: string): void {
  this.hubConnection.invoke("SendMessage", user, message)
    .catch(err => console.error(err));
}
public removeNotification(id?:number){
  this._apiNotification.removeNotification(id as number).subscribe(x=>{console.log(x);
    this._apiNotification.getNotifications(this.tok.getIdUser()).subscribe(x=>{this.notifications=x;console.log(x)});})
}

}
