import {Category} from "../common/category";

export interface GetResponseCategories {
  _embedded: {
    categories: Category[];
  }
}
