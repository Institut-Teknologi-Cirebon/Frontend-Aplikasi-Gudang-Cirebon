import {CashAccount} from "../common/cash-account";

export interface GetResponseCashAccount {
  _embedded: {
    cashAccounts: CashAccount[];
  }
}
