import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmergencyContact } from '../common/models/emergencyContact';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactsService {
  protected URL = 'https://travel-agency--api.azurewebsites.net/api/emergencyContacts';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<EmergencyContact> {
    return this.http.get<EmergencyContact>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<EmergencyContact[]> {
    return this.http.get<EmergencyContact[]>(this.URL, {params: params});
  }

  public insert(data: EmergencyContact): Observable<EmergencyContact> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<EmergencyContact>(this.URL, data, {headers: headers});
  }

  public update(emergencyContact: EmergencyContact): Observable<EmergencyContact> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<EmergencyContact>(this.URL + '/' + emergencyContact.id, emergencyContact, {headers: headers});
  }

  public delete(id): Observable<EmergencyContact> {
    return this.http.delete<EmergencyContact>(this.URL + '/' + id);
  }

}
