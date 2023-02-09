import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {NgForm} from "@angular/forms";
import {Category} from "../../common/category";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  product?: Product;
  productUnits = Object.keys(ProductUnits);
  categories: Category[] = [];
  toastType: string = '';
  toastMessage?: string;

  constructor(private productService: ProductService,
              private modal: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 4;
    this.getProducts();
    this.templateComponent.title = 'Product';
    this.getCategories();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    );
  }

  getCategories(): void {
    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
  }

  onAddProduct(addForm: NgForm): void {
    addForm.value.name = addForm.value.name.toUpperCase();
    let initialName = addForm.value.name.split(/\s/).reduce((response: any, word: string | any[]) => response + word.slice(0, 1), '');
    let lastCharName = addForm.value.name.substring(addForm.value.name.length - 1);
    let initialCat = addForm.value.category.name.split(/\s/).reduce((response: any, word: string | any[]) => response + word.slice(0, 1), '');

    let lastProductId = 0;
    if (this.products.at(0) != null) {
      lastProductId = this.products.at(0)!.id;
    }

    addForm.value.code = `${initialName + lastCharName}-${initialCat}-${lastProductId! + 1}`;

    this.productService.addProduct(addForm.value).subscribe(
      () => {
        this.getProducts();
        this.toastType = 'success';
        this.toastMessage = "menyimpan";
      }
    );
  }

  onUpdateProduct(product: Product): void {
    product.name = product.name.toUpperCase();

    this.productService.updateProduct(product).subscribe(
      () => {
        this.getProducts();
        this.toastType = 'success';
        this.toastMessage = "mengubah";
      }
    );
  }

  // onDeleteProduct(id: number): void {
  //   this.productService.deleteProduct(id).subscribe(
  //     () => {
  //       this.getProducts();
  //       this.toastType = 'success';
  //       this.toastMessage = "menghapus";
  //     }
  //   );
  // }

  openAddModal(content: any) {
    this.modal.open(content);
    document.getElementById('addName')?.focus();
  }

  openUpdateModal(content: any, product: Product) {
    this.product = product;
    this.modal.open(content);
    document.getElementById('updateName')?.focus();
  }

  // openDeleteModal(content: any, product: Product) {
  //   this.product = product;
  //   this.modal.open(content);
  //   document.getElementById('delete')?.focus();
  // }

  compareCategories(o1: Category, o2: Category): boolean {
    if (o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.name == o2.name;
  }
}

enum ProductUnits {
  PCS = 'PCS',
  PAK = 'PAK',
  BAL = 'BAL',
  BTL = 'BTL',
  BKS = 'BKS',
  KG = 'KG',
  GRAM = 'GRAM',
  KRG = 'KRG',
  LTR = 'LTR',
  RTR = 'RTR',
  RTG = 'RTG',
  BAG = 'BAG',
  SAK = 'SAK',
  DUS = 'DUS',
  KLG = 'KLG'
}
