import {Component, OnInit} from '@angular/core';
import {StockIn} from "../../common/stock-in";
import {StockOut} from "../../common/stock-out";
import {StockInService} from "../../services/stock-in.service";
import {DatePipe} from "@angular/common";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [DatePipe]
})
export class StockComponent implements OnInit {

  stockIns: StockIn[] = [];
  expiredProducts: StockIn[] = [];
  currentDate = new Date();
  date!: string;

  constructor(private stockInService: StockInService,
              private templateComponent: SiteTemplateComponent,
              private datePipe: DatePipe) {
    this.date = datePipe.transform(this.currentDate, 'yyyy-MM-dd')!;
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 7;
    this.getStockIns();
    this.templateComponent.title = 'Rekap Stok';
  }

  getStockIns(): void {
    this.stockInService.getStockIns().subscribe(
      dataIn => {
        this.stockIns = dataIn.reduce((ins: StockIn[], si: StockIn) => {
          let stockIn = ins.find(ai => ai.product.id == si.product.id);
          si.amount = (si.warehouseQuantity + si.storeQuantity) * si.unitPurchasePrice;
          si.stockOuts = [];
          if (stockIn) {
            stockIn.warehouseQuantity += si.warehouseQuantity;
            stockIn.storeQuantity += si.storeQuantity;
            stockIn.amount += si.amount;
          } else {
            ins.push(si);
          }

          this.stockInService.getStockOuts(si.product.id).subscribe(
            dataOut => {
              si.stockOuts = dataOut.reduce((outs: StockOut[], so: StockOut) => {
                let stockOut = outs.find(ai => ai.product.id == so.product.id);
                if (stockOut) {
                  stockOut.warehouseQuantity += so.warehouseQuantity;
                  stockOut.storeQuantity += so.storeQuantity;
                  stockOut.totalSellingPrice += so.totalSellingPrice;
                } else {
                  outs.push(so);
                }
                return outs;
              }, []);
            }
          );

          this.stockInService.getExpiredProductAmount(this.date, si.product.id).subscribe(
            dataExpired => {
              this.expiredProducts = dataExpired.reduce((exs: StockIn[], ex: StockIn) => {
                let products = exs.find(ai => ai.product.id == ex.product.id);
                if (products) {
                  products.warehouseQuantity += ex.warehouseQuantity;
                  products.storeQuantity += ex.storeQuantity;
                  si.expiredAmount = products.warehouseQuantity + products.storeQuantity;
                } else {
                  si.expiredAmount = ex.warehouseQuantity + ex.storeQuantity;
                  exs.push(ex);
                }
                return exs;
              }, []);
            }
          );

          return ins;
        }, []);
      }
    );
  }
}
