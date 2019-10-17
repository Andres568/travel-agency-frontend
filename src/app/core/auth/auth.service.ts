import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/common/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<any> {
    const urlEndpoint = 'https://travel-agency--api.azurewebsites.net/api/users/authenticate';

    //const credenciales = btoa('angularapp' + ':' + '12345');

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');

    const params = new URLSearchParams();
    params.set('grant_type', 'Password');
    params.set('Username', user.username);
    params.set('Password', user.password);
    console.log(params.toString());
    return this.http.post<User>(urlEndpoint, user, { headers: httpHeaders });
  }

  guardarUser(payload): void {
    this._user = new User();
    this._user.username = payload.username;
    this._user.email = payload.email;
    this._user.role = payload.role;
    console.log(payload)
    console.log(this._user)
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  guardarToken(accessToken: string): void {
    console.log(accessToken)
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (this.user != null && this.user.username && this.user.username.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.user.role && this.user.role.trim() === role) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
