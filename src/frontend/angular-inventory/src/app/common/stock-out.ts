import {Stall} from "./stall";
import {Product} from "./product";

export class StockOut {
  constructor(public id: number,
              public date: Date,
              public trx: string,
              public stall: Stall,
              public product: Product,
              public unitPurchasePrice: number,
              public totalPurchasePrice: number,
              public warehouseQuantity: number,
              public storeQuantity: number,
              public totalQty: number,
              public unitSellingPrice: number,
              public totalSellingPrice: number,
              public moneyPaid: number,
              public receivables: number,
              public profit: number) {
  }
}
