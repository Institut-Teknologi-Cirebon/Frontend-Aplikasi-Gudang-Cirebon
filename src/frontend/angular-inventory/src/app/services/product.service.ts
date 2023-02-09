import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Product} from "../common/product";
import {Category} from "../common/category";
import {GetResponseProducts} from "../interfaces/get-response-products";
import {GetResponseCategories} from "../interfaces/get-response-categories";


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public apiUrl = "http://localhost:8080/api/products";
  public categoryUrl = "http://localhost:8080/api/categories";

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.apiUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.products)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.categories)
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // deleteProduct(id: number): Observable<void> {
  //   return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
