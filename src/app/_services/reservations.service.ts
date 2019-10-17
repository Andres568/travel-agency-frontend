import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../common/models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  protected URL = 'https://travel-agency--api.azurewebsites.net/api/reservations';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<Reservation> {
    return this.http.get<Reservation>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.URL, {params: params});
  }

  public insert(data: Reservation): Observable<Reservation> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Reservation>(this.URL, data, {headers: headers});
  }

  public update(reservation: Reservation): Observable<Reservation> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Reservation>(this.URL + '/' + reservation.id, reservation, {headers: headers});
  }

  public delete(id): Observable<Reservation> {
    return this.http.delete<Reservation>(this.URL + '/' + id);
  }

}
