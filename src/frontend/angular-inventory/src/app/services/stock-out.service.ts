import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {StockOut} from "../common/stock-out";
import {Product} from "../common/product";
import {Stall} from "../common/stall";
import {GetResponseStockOuts} from "../interfaces/get-response-stock-outs";
import {GetResponseProducts} from "../interfaces/get-response-products";
import {GetResponseStalls} from "../interfaces/get-response-stalls";

@Injectable({
  providedIn: 'root'
})
export class StockOutService {

  private apiUrl = "http://localhost:8080/api/stockOuts";
  private productUrl = "http://localhost:8080/api/products";
  private stallUrl = "http://localhost:8080/api/stalls";

  constructor(private httpClient: HttpClient) { }

  getStockOuts(): Observable<StockOut[]> {
    return this.httpClient.get<GetResponseStockOuts>(this.apiUrl + '?sort=id, desc').pipe(
      map(response => response._embedded.stockOuts)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.productUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.products)
    );
  }

  getStalls(): Observable<Stall[]> {
    return this.httpClient.get<GetResponseStalls>(this.stallUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.stalls)
    );
  }

  getStockOutsToday(date: string): Observable<StockOut[]> {
    return this.httpClient.get<GetResponseStockOuts>(this.apiUrl + '/search/findByDateEquals?date=' + date).pipe(
      map(response => response._embedded.stockOuts)
    );
  }

  getStockOutsMonthly(startDate: string, endDate: string): Observable<StockOut[]> {
    return this.httpClient.get<GetResponseStockOuts>(this.apiUrl + '/search/findByDateBetween?startDate=' + startDate + '&endDate=' + endDate).pipe(
      map(response => response._embedded.stockOuts)
    );
  }

  addStockOut(stockOut: StockOut): Observable<StockOut> {
    return this.httpClient.post<StockOut>(this.apiUrl, stockOut);
  }

  updateStockOut(stockOut: StockOut): Observable<StockOut> {
    return this.httpClient.put<StockOut>(`${this.apiUrl}/${stockOut.id}`, stockOut);
  }

  deleteStockOut(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
