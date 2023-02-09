import {Category} from "./category";

export class Product {

  constructor(public id: number,
              public code: string,
              public name: string,
              public unit: string,
              public category: Category,
              public warehouseQuantity: number,
              public storeQuantity: number) {
  }

}
