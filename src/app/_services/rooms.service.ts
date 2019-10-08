import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../common/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  protected URL = 'https://travel-agency--api.azurewebsites.net/api/rooms';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<Room> {
    return this.http.get<Room>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Room[]> {
    return this.http.get<Room[]>(this.URL, {params: params});
  }

  public insert(data: Room): Observable<Room> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Room>(this.URL, data, {headers: headers});
  }

  public update(room: Room): Observable<Room> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Room>(this.URL + '/' + room.Id, room, {headers: headers});
  }

  public delete(id): Observable<Room> {
    return this.http.delete<Room>(this.URL + '/' + id);
  }

}
