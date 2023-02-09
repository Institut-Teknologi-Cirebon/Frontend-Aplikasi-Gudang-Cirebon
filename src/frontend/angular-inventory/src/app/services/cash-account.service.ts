import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


import {map} from "rxjs/operators";
import {CashAccount} from "../common/cash-account";
import {GetResponseCashAccount} from "../interfaces/get-response-cash-account";





@Injectable({
  providedIn: 'root'
})
export class CashAccountService {

  private apiUrl = "http://localhost:8080/api/cashAccounts";

  constructor(private httpClient: HttpClient) { }

  getCashAccounts(): Observable<CashAccount[]> {
    return this.httpClient.get<GetResponseCashAccount>(this.apiUrl + '?sort=id,asc').pipe(
      map(response => response._embedded.cashAccounts)
    );
  }

  addCashAccount(cashAccount: CashAccount): Observable<CashAccount> {
    return this.httpClient.post<CashAccount>(this.apiUrl, cashAccount);
  }

  updateCashAccount(cashAccount: CashAccount): Observable<CashAccount> {
    return this.httpClient.put<CashAccount>(`${this.apiUrl}/${cashAccount.id}`, cashAccount);
  }
}
