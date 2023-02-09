import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../common/category";
import {map} from "rxjs/operators";
import {Product} from "../common/product";
import {GetResponseCategories} from "../interfaces/get-response-categories";
import {GetResponseProducts} from "../interfaces/get-response-products";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = "http://localhost:8080/api/categories";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategories>(this.apiUrl + '?sort=id,desc').pipe(
      map(response => response._embedded.categories)
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.apiUrl}/${id}`);
  }

  getProductsFromCategory(id: number): Observable<Product[]> {
    const url = `${this.apiUrl}/${id}/products?sort=id,desc`;
    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  // deleteCategory(id: number): Observable<void> {
  //   return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  // }

  handleError(error: HttpErrorResponse) {
    if (error.error && error.error.errors) {
      error.error.errors.forEach((err: { message: string; }) => {
        const message = err.message;
        console.log(message);
      })
    } else {
      console.log(error);
    }
    return [];
  }

}
