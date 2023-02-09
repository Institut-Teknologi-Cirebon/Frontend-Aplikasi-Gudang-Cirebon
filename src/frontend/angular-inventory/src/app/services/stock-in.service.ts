import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockIn} from "../common/stock-in";
import {map} from "rxjs/operators";
import {Product} from "../common/product";
import {StockOut} from "../common/stock-out";
import {GetResponseStockIns} from "../interfaces/get-response-stock-ins";
import {GetResponseProducts} from "../interfaces/get-response-products";
import {GetResponseStockOuts} from "../interfaces/get-response-stock-outs";

@Injectable({
  providedIn: 'root'
})
export class StockInService {

  private apiUrl = "http://localhost:8080/api/stockIns";
  private productUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) { }

  getStockIns(): Observable<StockIn[]> {
    return this.httpClient.get<GetResponseStockIns>(this.apiUrl + '?sort=id, desc').pipe(
      map(response => response._embedded.stockIns)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.productUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.products)
    );
  }

  getStockOuts(id: number): Observable<StockOut[]> {
    return this.httpClient.get<GetResponseStockOuts>(this.apiUrl + '/search/findByProductId?id=' + id).pipe(
      map(response => response._embedded.stockOuts)
    );
  }

  getExpiredProducts(date: string): Observable<StockIn[]> {
    return this.httpClient.get<GetResponseStockIns>(this.apiUrl + '/search/findByExpiredDateLessThan?currentDate=' + date).pipe(
      map(response => response._embedded.stockIns)
    );
  }

  getExpiredProductAmount(date: string, id: number): Observable<StockIn[]> {
    return this.httpClient.get<GetResponseStockIns>(this.apiUrl + '/search/findByProductIdAndExpiredDateLessThan?id=' + id + '&currentDate=' + date).pipe(
      map(response => response._embedded.stockIns)
    );
  }

  getStockInsToday(date: string): Observable<StockIn[]> {
    return this.httpClient.get<GetResponseStockIns>(this.apiUrl + '/search/findByDateEquals?date=' + date).pipe(
      map(response => response._embedded.stockIns)
    );
  }

  getStockInsMonthly(startDate: string, endDate: string): Observable<StockIn[]> {
    return this.httpClient.get<GetResponseStockIns>(this.apiUrl + '/search/findByDateBetween?startDate=' + startDate + '&endDate=' + endDate).pipe(
      map(response => response._embedded.stockIns)
    );
  }

  addStockIn(stockIn: StockIn): Observable<StockIn> {
    return this.httpClient.post<StockIn>(this.apiUrl, stockIn);
  }

  updateStockIn(stockIn: StockIn): Observable<StockIn> {
    return this.httpClient.put<StockIn>(`${this.apiUrl}/${stockIn.id}`, stockIn);
  }

  deleteStockIn(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
