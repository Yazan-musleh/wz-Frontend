// angular import
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CardComponent, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export default class LoginComponent implements OnInit{
  errorMessage: string = '';

  webhookData: any;

  qrCodeBase64: any;
  qrCode: string | null = null;

  loading = false;
  authFailure = false;
  authenticated = false;
  isLoggedIn = false;
  instanceStatus: string = "loading... please wait";

  username: string = '';
  phoneNumber: string = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private signalRService: SignalRService,
    private router: Router
  ) {
  }
  ngOnInit(): void {

    this.getStatus();

    this.getWebHookData();
  }


  getStatus() {
    this.authService.getStatus().subscribe( status => {
      console.log(status);
      this.instanceStatus = status;

      switch (this.instanceStatus) {
        case "qr":
          this.getQrCode();
          break;
        case "ready":
          this.isLoggedIn = true;
          this.fetchUserDetails();
      }
    })
  }

  fetchUserDetails(): void {
    this.authService.getUserData().subscribe(
      (data) => {
        if (data.status != "success") {
          console.log("error", data.status)
        }
        this.username = data.username;
        this.phoneNumber = data.phoneNumber;
      },
      (error) => {
        console.error('Error fetching user details', error);
        this.instanceStatus = 'Error fetching data';
      }
    );
  }

  retry(){
    window.location.reload();
  }
  getQrCode(){
    this.authService.getQrCode().subscribe(data => {
      
      this.webhookData = data;
      
      this.qrCodeBase64 = this.webhookData.qrCode.data.qr_code;
      this.qrCode = this.qrCodeBase64;
      console.log('data: ', this.qrCodeBase64);

      this.loading = false;
      this.authFailure = false;
      console.log("qr code")
      });
  }

  logout(){
    if (confirm("Are you sure you want to log out?")) {
      
    
    this.authService.logout().subscribe( data =>{
      console.log(data);
      this.isLoggedIn = false;
      this.instanceStatus = "logging out..."
  });
}
  }
  

  getWebHookData(){
    this.signalRService.webhookData$.subscribe(data => {
      if (data) {
        this.webhookData = data;
        console.log('Webhook event received:', data);
        this.instanceStatus = "qr"
        this.qrCodeBase64 = this.webhookData.data.base64;
      }
    });

    this.signalRService.qrCode$.subscribe(qr => {
      this.qrCode = qr;
      this.loading = false;
      this.authFailure = false;
      this.isLoggedIn = false;
      console.log("qr code")
    });

    this.signalRService.authFailure$.subscribe(failed => {
      if (failed) {
        this.authFailure = true;
        this.qrCode = null;
        this.loading = false;
        console.log("auth fail")
        this.instanceStatus = "authentication failure"
      }
    });

    this.signalRService.loading$.subscribe(loading => {
      this.loading = loading;
      this.instanceStatus = "loading..."
      this.qrCode = null;
      console.log("loading")

    });

    this.signalRService.authenticated$.subscribe(auth => {
      if (auth) {
        this.authenticated = true;
        this.instanceStatus = "authenticated"
        console.log("authenticated")
      }
    });

    this.signalRService.ready$.subscribe(ready => {
      if (ready) {
        this.router.navigate(['/add_members']); // Redirect after successful login
        this.instanceStatus = "ready"
        console.log("ready")
      }
    });

    this.signalRService.disconnected$.subscribe(disconnected => {
      if (disconnected) {
        this.isLoggedIn = false;
        this.instanceStatus = "disconnected"
        console.log("disconnected")
      }
    });

  }

}
