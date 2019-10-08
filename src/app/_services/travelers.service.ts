import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Traveler } from '../common/models/traveler';

@Injectable({
  providedIn: 'root'
})
export class TravelersService {
  protected URL = 'https://travel-agency--api.azurewebsites.net/api/travelers';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<Traveler> {
    return this.http.get<Traveler>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Traveler[]> {
    return this.http.get<Traveler[]>(this.URL, {params: params});
  }

  public insert(data: Traveler): Observable<Traveler> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Traveler>(this.URL, data, {headers: headers});
  }

  public update(traveler: Traveler): Observable<Traveler> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Traveler>(this.URL + '/' + traveler.Id, traveler, {headers: headers});
  }

  public delete(id): Observable<Traveler> {
    return this.http.delete<Traveler>(this.URL + '/' + id);
  }

}
