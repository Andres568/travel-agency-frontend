import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guest } from '../common/models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  protected URL = 'https://travel-agency--api.azurewebsites.net/api/guests';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<Guest> {
    return this.http.get<Guest>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.URL, {params: params});
  }

  public insert(data: Guest): Observable<Guest> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Guest>(this.URL, data, {headers: headers});
  }

  public update(guest: Guest): Observable<Guest> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Guest>(this.URL + '/' + guest.id, guest, {headers: headers});
  }

  public delete(id): Observable<Guest> {
    return this.http.delete<Guest>(this.URL + '/' + id);
  }

}
