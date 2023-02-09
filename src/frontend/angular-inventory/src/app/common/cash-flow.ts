import {CashAccount} from "./cash-account";

export class CashFlow {
  constructor(public id: number,
              public date: Date,
              public detail: string,
              public type: string,
              public amount: number,
              public cashAccount: CashAccount) {
  }
}
