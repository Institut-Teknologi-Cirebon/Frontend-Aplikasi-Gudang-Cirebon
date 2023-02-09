import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockIn} from "../common/stock-in";
import {GetResponseStockIns} from "../interfaces/get-response-stock-ins";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = "http://localhost:8080/api/stockIns";
  private productUrl = "http://localhost:8080/api/products";
  constructor(private httpClient: HttpClient) { }

  getStockIns(): Observable<StockIn[]> {
    return this.httpClient.get<GetResponseStockIns>(this.apiUrl + '?sort=id, desc').pipe(
      map(response => response._embedded.stockIns)
    );
  }
}
