import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:7284/api/auth/webhook";
  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  getStatus(): Observable<string> {
    return this.http.get(this.apiUrl + "/status", { responseType: 'text' });
  }

  getQrCode(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/qr');
  }
  
  getUserData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/user_data').pipe(
      map((response: any) => ({
        status: response.me.status, // Extract status
        username: response.me.data.displayName, // Extract display name
        phoneNumber: response.me.data.formattedNumber // Extract phone number
      }))
    );
  }
}
