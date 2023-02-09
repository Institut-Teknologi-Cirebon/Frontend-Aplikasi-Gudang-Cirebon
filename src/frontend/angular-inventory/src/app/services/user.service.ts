import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Credential, User} from "../common/user";
import {Observable} from "rxjs";

import {Router} from "@angular/router";
import {GetResponseUsers} from "../interfaces/get-response-users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl = "http://localhost:8080/api/users";

  public loginUrl = "http://localhost:8080/login";

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  login(credential: Credential) {
    return this.httpClient.post(this.loginUrl, credential, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');
        localStorage.setItem('token', token);
        return body;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']).then(
      () => {
        window.location.reload();
      }
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<GetResponseUsers>(this.apiUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.users)
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
