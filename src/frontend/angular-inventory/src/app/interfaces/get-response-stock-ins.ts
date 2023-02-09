import {StockIn} from "../common/stock-in";

export interface GetResponseStockIns {
  _embedded: {
    stockIns: StockIn[];
  }
}
