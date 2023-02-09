import {Product} from "./product";
import {StockOut} from "./stock-out";

export class StockIn {
  constructor(public id: number,
              public date: Date,
              public product: Product,
              public expiredDate: Date,
              public warehouseQuantity: number,
              public storeQuantity: number,
              public unitPurchasePrice: number,
              public totalQty: number,
              public amount: number,
              public stockOuts: StockOut[],
              public expiredAmount: number) {
  }
}
