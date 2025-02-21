import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  public webhookData$: BehaviorSubject<any> = new BehaviorSubject(null);

  public qrCode$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public authFailure$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public disconnected$: BehaviorSubject<string | null> = new BehaviorSubject(null);


    constructor() {
      this.startConnection();
     }

     private startConnection(){
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:7284/waapiHub")
          .withAutomaticReconnect()
          .build();

       this.hubConnection.start().catch(err => console.error('Error connecting:', err));

       this.hubConnection.on('ReceiveWebhookData', (data) => {
         console.log('Webhook Data:', data);
         this.webhookData$.next(data);
         this.handleWebhookEvent(data);
       });
     }


  private handleWebhookEvent(data: any) {
    switch (data.event) {
      case 'qr':
        this.qrCode$.next(data.data); // QR Code as base64 string or URL
        break;
      case 'auth_failure':
        this.authFailure$.next(true);
        break;
      case 'loading_screen':
        this.loading$.next(true);
        break;
      case 'authenticated':
        this.authenticated$.next(true);
        break;
      case 'ready':
        this.ready$.next(true);
        break;
      case 'disconnected':
        this.disconnected$.next(data.reason);
        break;
    } 
  }
}
