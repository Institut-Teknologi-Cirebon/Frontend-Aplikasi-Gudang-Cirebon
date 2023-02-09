import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CashFlow} from "../common/cash-flow";
import {map} from "rxjs/operators";
import {CashAccount} from "../common/cash-account";
import Decimal from "decimal.js";
import {GetResponseCashFlow} from "../interfaces/get-response-cash-flow";

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  cashAccounts: CashAccount[] = [];
  cashFlows: CashFlow[] = [];

  private apiUrl = "http://localhost:8080/api/cashFlows";

  constructor(private httpClient: HttpClient) { }

  getCashFlows(): Observable<CashFlow[]> {
    return this.httpClient.get<GetResponseCashFlow>(this.apiUrl + '?sort=id,asc').pipe(
      map(response => response._embedded.cashFlows)
    );
  }

  addCashFlow(cashFlow: CashFlow) {
    return this.httpClient.post<CashFlow>(this.apiUrl, cashFlow);
  }

  updateCashFlow(cashFlow: CashFlow) {
    return this.httpClient.put<CashFlow>(`${this.apiUrl}/${cashFlow.id}`, cashFlow);
  }

  deleteCashFlow(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  calculateAmount(index: number, ca: CashAccount): number {
    let sum = new Decimal(0);
    for (let i = 0; i <= index; i++) {
      let amount = new Decimal(this.cashFlows[i].amount);

      if (this.cashFlows[i].type == 'KELUAR' && this.cashFlows[i].cashAccount.id == ca.id) {
        sum = sum.minus(amount);
      } else if (this.cashFlows[i].type == 'MASUK' && this.cashFlows[i].cashAccount.id == ca.id) {
        sum = sum.plus(amount);
      } else {
        sum = sum.plus(0);
      }
    }
    return sum.toNumber();
  }

  calculateBalance(ca: CashAccount): number {
    let sum = new Decimal(0);
    for (let i = 0; i < this.cashFlows.length; i++) {
      sum = new Decimal(this.calculateAmount(i, ca).toString());
    }
    return sum.toNumber();
  }

  calculateTotalBalance(cashAccounts: CashAccount[], cashFlows: CashFlow[]): number {
    this.cashAccounts = cashAccounts;
    this.cashFlows = cashFlows;
    let total = new Decimal(0);
    for (let i = 0; i < this.cashAccounts.length; i++) {
      let balance = new Decimal(this.calculateBalance(this.cashAccounts[i]).toString());
      total = total.plus(balance);
    }
    return total.toNumber();
  }

}
