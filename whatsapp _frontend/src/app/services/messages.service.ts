import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private apiUrl = 'http://localhost:7284/api/message'; // Replace with your actual API URL
    
    constructor(private http: HttpClient) { }

      SendMessage( messageContent: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file, file.name);
    
        return this.http.post(this.apiUrl +"/send?messageContent="+messageContent, formData).pipe(
          catchError(this.handleError) // Handle errors gracefully
        );
      }

       private handleError(error: HttpErrorResponse) {
          console.error('File upload error:', error);
          alert(error.message);
          return throwError(() => new Error('File upload failed. Please try again.'));
        }
      
}
