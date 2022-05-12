import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private serverUrl: string = 'http://localhost:9000'; // JSON-SERVER URL

  constructor(private httpClient: HttpClient) {

  }

   // Get all the contact
  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
     return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));


     // Get Single contact

  }
   public getContact(contactId: string): Observable<IContact> {
     let dataURL:string = `${this.serverUrl}/contacts/${contactId}`;
     return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
   }
    // Create a contact
     public createContact(contact : IContact): Observable<IContact>{
       let dataURL: string = `${this.serverUrl}/contacts`;
       return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError));
     }
    // update a contact
  public updateContact(contact : IContact, contactId : string): Observable<IContact>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

   // delete a contact
   public deleteContact(contactId : IContact): Observable<{}>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  // get all the groups
  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
     return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));

  }
  // get the singel group
  public getGroups(contact: IContact): Observable<IGroup> {
    let dataURL:string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));

  }
  // error handing
  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    // Return an observable with a user-facing error message.
    errorMessage += '\n Something bad happened; please try again later.';
    return throwError(errorMessage);
  }
}
