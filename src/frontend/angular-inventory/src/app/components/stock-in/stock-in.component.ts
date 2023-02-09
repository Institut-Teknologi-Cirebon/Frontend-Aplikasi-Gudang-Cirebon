import {Component, OnInit} from '@angular/core';
import {StockIn} from "../../common/stock-in";
import {StockInService} from "../../services/stock-in.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";
import Decimal from "decimal.js";

@Component({
  selector: 'app-stock-in',
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.css']
})
export class StockInComponent implements OnInit {
  stockIns: StockIn[] = [];
  stockIn?: StockIn;
  products: Product[] = [];
  today = new Date;
  toastType: string = '';
  toastMessage?: string;

  constructor(private stockInService: StockInService,
              private productService: ProductService,
              private modal: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 5;
    this.getStockIns();
    this.getProducts();
    this.templateComponent.title = 'Input Stok';
  }

  getStockIns(): void {
    this.stockInService.getStockIns().subscribe(
      data => {
        data.forEach(value => {
          let wareQty = new Decimal(value.warehouseQuantity);
          let storeQty = new Decimal(value.storeQuantity);
          let unitPurchasePrice = new Decimal(value.unitPurchasePrice);
          value.totalQty = +wareQty.plus(storeQty);
          value.amount = +(wareQty.plus(storeQty).times(unitPurchasePrice));
        });
        this.stockIns = data;
      }
    );
  }

  getProducts(): void {
    this.stockInService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    );
  }

  onAddStockIn(addForm: NgForm) {

    addForm.value.warehouseQuantity = this.removeDotNumber(addForm.value.warehouseQuantity);
    addForm.value.storeQuantity = this.removeDotNumber(addForm.value.storeQuantity);
    addForm.value.unitPurchasePrice = this.removeDotNumber(addForm.value.unitPurchasePrice);

    let productWareQty = new Decimal(addForm.value.product.warehouseQuantity);
    let productStoreQty = new Decimal(addForm.value.product.storeQuantity);
    let wareQty = new Decimal(addForm.value.warehouseQuantity);
    let storeQty = new Decimal(addForm.value.storeQuantity);

    addForm.value.product.warehouseQuantity = productWareQty.plus(wareQty);
    addForm.value.product.storeQuantity = productStoreQty.plus(storeQty);

    this.stockInService.addStockIn(addForm.value).subscribe(
      data => {

        this.productService.updateProduct(data.product).subscribe(
          () => {
            this.getStockIns();
            this.toastType = 'success';
            this.toastMessage = "menyimpan";
          }
        );
      }
    );
  }

  onUpdateStockIn(updateForm: NgForm) {

    updateForm.value.warehouseQuantity = this.removeDotNumber(updateForm.value.warehouseQuantity);
    updateForm.value.storeQuantity = this.removeDotNumber(updateForm.value.storeQuantity);
    updateForm.value.unitPurchasePrice = this.removeDotNumber(updateForm.value.unitPurchasePrice);

    let productWareQty = new Decimal(updateForm.value.product.warehouseQuantity);
    let productStoreQty = new Decimal(updateForm.value.product.storeQuantity);
    let prevWareQty = new Decimal(this.stockIn!.warehouseQuantity);
    let prevStoreQty = new Decimal(this.stockIn!.storeQuantity);
    let wareQty = new Decimal(updateForm.value.warehouseQuantity);
    let storeQty = new Decimal(updateForm.value.storeQuantity);

    updateForm.value.product.warehouseQuantity = productWareQty.minus(prevWareQty).plus(wareQty);
    updateForm.value.product.storeQuantity = productStoreQty.minus(prevStoreQty).plus(storeQty);

    this.stockInService.updateStockIn(updateForm.value).subscribe(
      data => {
        this.productService.updateProduct(data.product).subscribe(
          () => {
            this.getStockIns();
            this.toastType = 'success';
            this.toastMessage = "mengubah";
          }
        );
      }
    );
  }

  onDeleteStockIn(id: number): void {
    this.stockInService.deleteStockIn(id).subscribe(
      () => {

        let productWareQty = new Decimal(this.stockIn!.product.warehouseQuantity);
        let productStoreQty = new Decimal(this.stockIn!.product.storeQuantity);
        let prevWareQty = new Decimal(this.stockIn!.warehouseQuantity);
        let prevStoreQty = new Decimal(this.stockIn!.storeQuantity);

        this.stockIn!.product.warehouseQuantity = +productWareQty.minus(prevWareQty);
        this.stockIn!.product.storeQuantity = +productStoreQty.minus(prevStoreQty);

        this.productService.updateProduct(this.stockIn!.product).subscribe(
          () => {
            this.getStockIns();
            this.toastType = 'success';
            this.toastMessage = "menghapus";
          }
        );
      }
    );
  }

  openAddModal(content: any) {
    this.modal.open(content);
    document.getElementById('addDate')?.focus();
  }

  openUpdateModal(content: any, stockIn: StockIn) {
    this.stockIn = stockIn;
    this.modal.open(content);
    document.getElementById('updateDate')?.focus();
  }

  openDeleteModal(content: any, stockIn: StockIn) {
    this.stockIn = stockIn;
    this.modal.open(content);
    document.getElementById('delete')?.focus();
  }

  compareProducts(o1: Product, o2: Product): boolean {
    if (o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.name == o2.name;
  }

  removeDotNumber(input: string): number {
    input = input.replace(/\./g, '');
    input = input.replace(/,/g, '.');
    return Number(input);
  }

  addDotNumber(input: number): string {
    let inputString: string = String(input);
    inputString = inputString.replace(/\./g, ',');
    inputString = inputString.replace(/[^0-9,]/g, '');
    inputString = inputString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return inputString;
  }

  addDotNumberCurrency(input: number): string {
    let inputString: string = String(input);
    inputString = inputString.replace(/[^0-9]/g, '');
    inputString = Number(inputString).toLocaleString('id-ID');
    return inputString;
  }

}
