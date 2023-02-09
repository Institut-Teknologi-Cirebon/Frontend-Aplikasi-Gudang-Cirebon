import {CashFlow} from "../common/cash-flow";

export interface GetResponseCashFlow {
  _embedded: {
    cashFlows: CashFlow[];
  }
}
