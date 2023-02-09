import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Stall} from "../common/stall";
import {GetResponseStalls} from "../interfaces/get-response-stalls";


@Injectable({
  providedIn: 'root'
})
export class StallService {

  private apiUrl = "http://localhost:8080/api/stalls";

  constructor(private httpClient: HttpClient) { }

  getStalls(): Observable<Stall[]> {
    return this.httpClient.get<GetResponseStalls>(this.apiUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.stalls)
    );
  }
  addStall(stall: Stall): Observable<Stall> {
    return this.httpClient.post<Stall>(this.apiUrl, stall);
  }

  updateStall(stall: Stall): Observable<Stall> {
    return this.httpClient.put<Stall>(`${this.apiUrl}/${stall.id}`, stall);
  }

  // deleteStall(id: number): Observable<void> {
  //   return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
