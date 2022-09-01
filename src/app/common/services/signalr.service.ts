import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { UserService } from 'src/app/users/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  hubConnection: signalR.HubConnection;
  public source = 'https://localhost:44390/driver';

  constructor(public dialog: MatDialog, public userService: UserService) {}

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.source, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    var connection = this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public stopConnection(methodName: string) {
    this.hubConnection.off(methodName);
  }

  askServerListener() {
    if(this.userService.isOrderManager() || this.userService.isManager()){
      this.hubConnection.on('notification', (notification) => {
        const dialogRef = this.dialog.open(NotificationComponent, {
          width: '300px',
          data: notification.notification,
        });
      });
    }  
  }
}
