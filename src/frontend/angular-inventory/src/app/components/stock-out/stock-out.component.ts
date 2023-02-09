import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../services/product.service";
import {NgForm} from "@angular/forms";
import {StockOutService} from "../../services/stock-out.service";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";
import {StockOut} from "../../common/stock-out";
import {Product} from "../../common/product";
import {Stall} from "../../common/stall";
import Decimal from "decimal.js";

@Component({
  selector: 'app-stock-out',
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.css']
})
export class StockOutComponent implements OnInit {
  stockOuts: StockOut[] = [];
  stockOut?: StockOut;
  qty?: number;
  products: Product[] = [];
  stalls: Stall[] = [];
  toastType: string = '';
  toastMessage?: string;
  today = new Date;

  constructor(private stockOutService: StockOutService,
              private productService: ProductService,
              private modal: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 6;
    this.getStockOuts();
    this.getProducts();
    this.getStalls();
    this.templateComponent.title = 'Penjualan';
  }

  getStockOuts(): void {
    this.stockOutService.getStockOuts().subscribe(
      data => {
        data.forEach(value => {
          let wareQty = new Decimal(value.warehouseQuantity);
          let storeQty = new Decimal(value.storeQuantity);
          let unitPurchasePrice = new Decimal(value.unitPurchasePrice);
          let totalSellingPrice = new Decimal(value.totalSellingPrice);
          let moneyPaid = new Decimal(value.moneyPaid);
          value.totalQty = +wareQty.plus(storeQty);
          value.receivables = +moneyPaid.minus(totalSellingPrice);
          if (value.trx == "GUDANG") {
            value.totalPurchasePrice = +wareQty.times(unitPurchasePrice);
            value.unitSellingPrice = +totalSellingPrice.dividedBy(wareQty);
            value.profit = +totalSellingPrice.minus(new Decimal(value.totalPurchasePrice));
          } else if (value.trx == "TOKO") {
            value.totalPurchasePrice = +storeQty.times(unitPurchasePrice);
            value.unitSellingPrice = +totalSellingPrice.dividedBy(storeQty);
            value.profit = +totalSellingPrice.minus(new Decimal(value.totalPurchasePrice));
          }
        });
        this.stockOuts = data;
      }
    );
  }

  getProducts(): void {
    this.stockOutService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    );
  }

  getStalls(): void {
    this.stockOutService.getStalls().subscribe(
      (data: Stall[]) => {
        this.stalls = data;
      }
    );
  }

  onAddStockOut(addForm: NgForm) {

    addForm.value.unitPurchasePrice = this.removeDotNumber(addForm.value.unitPurchasePrice);
    addForm.value.quantity = this.removeDotNumber(addForm.value.quantity);
    addForm.value.totalSellingPrice = this.removeDotNumber(addForm.value.totalSellingPrice);
    addForm.value.moneyPaid = this.removeDotNumber(addForm.value.moneyPaid);

    let productWareQty = new Decimal(addForm.value.product.warehouseQuantity);
    let productStoreQty = new Decimal(addForm.value.product.storeQuantity);
    let qty = new Decimal(addForm.value.quantity);

    if (addForm.value.trx == 'GUDANG') {
      addForm.value.warehouseQuantity = qty;
      addForm.value.storeQuantity = 0;
      addForm.value.product.warehouseQuantity = productWareQty.minus(qty);
    }

    else if (addForm.value.trx == 'TOKO') {
      addForm.value.warehouseQuantity = 0;
      addForm.value.storeQuantity = qty;
      addForm.value.product.storeQuantity = productStoreQty.minus(qty);
    }

    this.stockOutService.addStockOut(addForm.value).subscribe(
      data => {
        this.productService.updateProduct(data.product).subscribe(
          () => {
            this.getStockOuts();
            this.toastType = "success";
            this.toastMessage = "menyimpan";
          }
        );
      }
    );
  }

  onUpdateStockOut(updateForm: NgForm) {

    const prevTrx = this.stockOut!.trx;
    updateForm.value.unitPurchasePrice = this.removeDotNumber(updateForm.value.unitPurchasePrice);
    updateForm.value.quantity = this.removeDotNumber(updateForm.value.quantity);
    updateForm.value.totalSellingPrice = this.removeDotNumber(updateForm.value.totalSellingPrice);
    updateForm.value.moneyPaid = this.removeDotNumber(updateForm.value.moneyPaid);

    let productWareQty = new Decimal(updateForm.value.product.warehouseQuantity);
    let productStoreQty = new Decimal(updateForm.value.product.storeQuantity);
    let prevWareQty = new Decimal(this.stockOut!.warehouseQuantity);
    let prevStoreQty = new Decimal(this.stockOut!.storeQuantity);
    let qty = new Decimal(updateForm.value.quantity);

    if (updateForm.value.trx == 'GUDANG') {

      updateForm.value.warehouseQuantity = qty;
      updateForm.value.storeQuantity = 0;

      if (prevTrx == 'GUDANG') {
        updateForm.value.product.warehouseQuantity = productWareQty.plus(prevWareQty).minus(qty);
      } else if (prevTrx == 'TOKO') {
        updateForm.value.product.warehouseQuantity = productWareQty.minus(qty);
        updateForm.value.product.storeQuantity = productStoreQty.plus(prevStoreQty);
      }

    }

    else if (updateForm.value.trx == 'TOKO') {

      updateForm.value.warehouseQuantity = 0;
      updateForm.value.storeQuantity = qty;

      if (prevTrx == 'TOKO') {
        updateForm.value.product.storeQuantity = productStoreQty.plus(prevStoreQty).minus(qty);
      } else if (prevTrx == 'GUDANG') {
        updateForm.value.product.warehouseQuantity = productWareQty.plus(prevWareQty);
        updateForm.value.product.storeQuantity = productStoreQty.minus(qty);
      }

    }

    this.stockOutService.updateStockOut(updateForm.value).subscribe(
      data => {
        this.productService.updateProduct(data.product).subscribe(
          () => {
            this.getStockOuts();
            this.toastType = "success";
            this.toastMessage = "menyimpan";
          }
        );
      }
    );
  }

  onDeleteStockOut(id: number) {
    this.stockOutService.deleteStockOut(id).subscribe(
      () => {

        let productWareQty = new Decimal(this.stockOut!.product.warehouseQuantity);
        let productStoreQty = new Decimal(this.stockOut!.product.storeQuantity);
        let prevWareQty = new Decimal(this.stockOut!.warehouseQuantity);
        let prevStoreQty = new Decimal(this.stockOut!.storeQuantity);

        this.stockOut!.product.warehouseQuantity = +productWareQty.plus(prevWareQty);
        this.stockOut!.product.storeQuantity = +productStoreQty.plus(prevStoreQty);

        this.productService.updateProduct(this.stockOut!.product).subscribe(
          () => {
            this.getStockOuts();
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

  openUpdateModal(content: any, stockOut: StockOut) {

    if (stockOut.trx == 'GUDANG') {
      this.qty = stockOut.warehouseQuantity;
    } else if (stockOut.trx == 'TOKO') {
      this.qty = stockOut.storeQuantity;
    }

    this.stockOut = stockOut;
    this.modal.open(content);
    document.getElementById('updateDate')?.focus();
  }

  openDeleteModal(content: any, stockOut: StockOut) {
    this.stockOut = stockOut;
    this.modal.open(content);
    document.getElementById('delete')?.focus();
  }

  compareProducts(o1: Product, o2: Product): boolean {
    if (o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.name == o2.name;
  }

  compareStalls(o1: Stall, o2: Stall): boolean {
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
