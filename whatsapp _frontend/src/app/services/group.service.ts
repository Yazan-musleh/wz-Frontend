import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:7284/api/group'; // Replace with your actual API URL
  

  constructor(private http: HttpClient) { }

  // GET request to fetch all groups
  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getGroups');
  }

  // POST request to create a new group
 
  CreateGroup( groupName: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.apiUrl +"/Create?groupName="+groupName, formData, {responseType: 'blob'}).pipe(
      catchError(this.handleError) // Handle errors gracefully
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('File upload error:', error);
    alert(error.message);
    return throwError(() => new Error('File upload failed. Please try again.'));
  }

  addMembersToGroup(groupId: string, file: File):Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.apiUrl + "/add?groupId=" + groupId, formData, {
      responseType: 'blob'});
  }

  getGroupParticipant(groupId: string): Observable<any> {
    return this.http.get(this.apiUrl + "?groupId=" + groupId, {
      responseType: 'blob'
    });
  }
}
