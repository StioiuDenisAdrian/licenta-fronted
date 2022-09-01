import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from './common/services/signalr.service';
import { UserService } from './users/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'licenta-frontend';

  constructor(public signalR: SignalrService){}
  ngOnDestroy(): void {
    this.signalR.hubConnection.off('');
  }

  ngOnInit(): void {
    this.signalR.startConnection();
      setTimeout(() =>{
          this.signalR.askServerListener();
      }, 2000);
  }
}
