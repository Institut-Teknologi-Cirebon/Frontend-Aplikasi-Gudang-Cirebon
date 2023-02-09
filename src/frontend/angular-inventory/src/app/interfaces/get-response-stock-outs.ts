import {StockOut} from "../common/stock-out";

export interface GetResponseStockOuts {
  _embedded: {
    stockOuts: StockOut[];
  }
}
