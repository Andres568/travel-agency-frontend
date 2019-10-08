import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../common/models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  protected URL = 'https://travel-agency--api.azurewebsites.net/api/hotels';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<Hotel> {
    return this.http.get<Hotel>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.URL, {params: params});
  }

  public insert(data: Hotel): Observable<Hotel> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Hotel>(this.URL, data, {headers: headers});
  }

  public update(hotel: Hotel): Observable<Hotel> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Hotel>(this.URL + '/' + hotel.Id, hotel, {headers: headers});
  }

  public delete(id): Observable<Hotel> {
    return this.http.delete<Hotel>(this.URL + '/' + id);
  }

}
