import {Component, OnInit} from '@angular/core';
import {SiteTemplateComponent} from "../template/site-template/site-template.component";
import {CashFlowService} from "../../services/cash-flow.service";
import Decimal from "decimal.js";
import {CashAccountService} from "../../services/cash-account.service";
import {StockInService} from "../../services/stock-in.service";
import {StockIn} from "../../common/stock-in";
import {DatePipe} from "@angular/common";
import {StockOutService} from "../../services/stock-out.service";
import {StockOut} from "../../common/stock-out";
import {CashFlow} from "../../common/cash-flow";
import {CashAccount} from "../../common/cash-account";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  stockIns: StockIn[] = [];
  stockOuts: StockOut[] = [];
  totalCashBalance = new Decimal(0);
  totalStockInToday = new Decimal(0);
  totalStockOutToday = new Decimal(0);
  totalProfitToday = new Decimal(0);
  totalStockInThisMonth = new Decimal(0);
  totalStockOutThisMonth = new Decimal(0);
  totalProfitThisMonth = new Decimal(0);
  totalStockInLastMonth = new Decimal(0);
  totalStockOutLastMonth = new Decimal(0);
  totalProfitLastMonth = new Decimal(0);
  currentDate = new Date();
  date!: string;
  startDate!: string;
  endDate!: string;
  startDateLastMonth!: string;
  endDateLastMonth!: string;
  cashAccounts: CashAccount[] = [];
  cashFlows: CashFlow[] = [];

  constructor(private templateComponent: SiteTemplateComponent,
              private cashFlowService: CashFlowService,
              private cashAccountService: CashAccountService,
              private stockInService: StockInService,
              private stockOutService: StockOutService,
              private datePipe: DatePipe){

    this.date = datePipe.transform(this.currentDate, 'yyyy-MM-dd')!;
    let startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd')!;
    let endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    this.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd')!;
    let startDateLastMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.startDateLastMonth = this.datePipe.transform(startDateLastMonth, 'yyyy-MM-dd')!;
    let endDateLastMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
    this.endDateLastMonth = this.datePipe.transform(endDateLastMonth, 'yyyy-MM-dd')!;

  }

  ngOnInit(): void {
    this.templateComponent.activeId = 1;
    this.getTotalCashBalance();
    this.getTotalStockInToday();
    this.getTotalStockOutToday();
    this.getProfitToday();
    this.getTotalStockInThisMonth();
    this.getTotalStockOutThisMonth();
    this.getTotalProfitThisMonth();
    this.getTotalStockInLastMonth();
    this.getTotalStockOutLastMonth();
    this.getTotalProfitLastMonth();
    this.templateComponent.title = 'Dashboard';
  }

  getTotalCashBalance(): void {
    this.cashAccountService.getCashAccounts().subscribe(
      data => {
        this.cashAccounts = data;
      }
    );

    this.cashFlowService.getCashFlows().subscribe(
      data => {
        this.cashFlows = data;
        let totalCashBalance = this.cashFlowService.calculateTotalBalance(this.cashAccounts, this.cashFlows);
        this.totalCashBalance = new Decimal(totalCashBalance);
      }
    );
  }

  getTotalStockInToday(): void {
    this.stockInService.getStockInsToday(this.date).subscribe(
      data => {
        this.stockIns = data.reduce((ins: StockIn[], si: StockIn) => {
          let wareQty = new Decimal(si.warehouseQuantity);
          let storeQty = new Decimal(si.storeQuantity);
          si.totalQty = +wareQty.plus(storeQty);
          let totalQty = new Decimal(si.totalQty);
          si.amount = +totalQty.times(si.unitPurchasePrice);
          let amount = new Decimal(si.amount);
          this.totalStockInToday = this.totalStockInToday.plus(amount);
          return ins;
        }, []);
      }
    );
  }

  getTotalStockOutToday(): void {
    this.stockOutService.getStockOutsToday(this.date).subscribe(
      data => {
        this.stockOuts = data.reduce((outs: StockOut[], so: StockOut) => {
          let totalSP = new Decimal(so.totalSellingPrice);
          this.totalStockOutToday = this.totalStockOutToday.plus(totalSP);
          return outs;
        }, []);
      }
    );
  }

  getProfitToday(): void {
    this.stockOutService.getStockOutsToday(this.date).subscribe(
      data => {
        data.forEach(value => {
          this.calculateProfit(value);
          this.totalProfitToday = this.totalProfitToday.plus(value.profit);
        });
      }
    );
  }

  getTotalStockInThisMonth(): void {
    this.stockInService.getStockInsMonthly(this.startDate, this.endDate).subscribe(
      data => {
        this.stockIns = data.reduce((ins: StockIn[], si: StockIn) => {
          let wareQty = new Decimal(si.warehouseQuantity);
          let storeQty = new Decimal(si.storeQuantity);
          si.totalQty = +wareQty.plus(storeQty);
          let totalQty = new Decimal(si.totalQty);
          si.amount = +totalQty.times(si.unitPurchasePrice);
          let amount = new Decimal(si.amount);
          this.totalStockInThisMonth = this.totalStockInThisMonth.plus(amount);
          return ins;
        }, []);
      }
    );
  }

  getTotalStockInLastMonth(): void {
    this.stockInService.getStockInsMonthly(this.startDateLastMonth, this.endDateLastMonth).subscribe(
      data => {
        this.stockIns = data.reduce((ins: StockIn[], si: StockIn) => {
          let wareQty = new Decimal(si.warehouseQuantity);
          let storeQty = new Decimal(si.storeQuantity);
          si.totalQty = +wareQty.plus(storeQty);
          let totalQty = new Decimal(si.totalQty);
          si.amount = +totalQty.times(si.unitPurchasePrice);
          let amount = new Decimal(si.amount);
          this.totalStockInLastMonth = this.totalStockInLastMonth.plus(amount);
          return ins;
        }, []);
      }
    );
  }

  getTotalStockOutThisMonth(): void {
    this.stockOutService.getStockOutsMonthly(this.startDate, this.endDate).subscribe(
      data => {
        this.stockOuts = data.reduce((outs: StockOut[], so: StockOut) => {
          let totalSP = new Decimal(so.totalSellingPrice);
          this.totalStockOutThisMonth = this.totalStockOutThisMonth.plus(totalSP);
          return outs;
        }, []);
      }
    );
  }

  getTotalStockOutLastMonth(): void {
    this.stockOutService.getStockOutsMonthly(this.startDateLastMonth, this.endDateLastMonth).subscribe(
      data => {
        this.stockOuts = data.reduce((outs: StockOut[], so: StockOut) => {
          let totalSP = new Decimal(so.totalSellingPrice);
          this.totalStockOutLastMonth = this.totalStockOutLastMonth.plus(totalSP);
          return outs;
        }, []);
      }
    );
  }

  getTotalProfitThisMonth(): void {
    this.stockOutService.getStockOutsMonthly(this.startDate, this.endDate).subscribe(
      data => {
        data.forEach(value => {
          this.calculateProfit(value);
          this.totalProfitThisMonth = this.totalProfitThisMonth.plus(value.profit);
        });
      }
    );
  }

  getTotalProfitLastMonth(): void {
    this.stockOutService.getStockOutsMonthly(this.startDateLastMonth, this.endDateLastMonth).subscribe(
      data => {
        data.forEach(value => {
          this.calculateProfit(value);
          this.totalProfitLastMonth = this.totalProfitLastMonth.plus(value.profit);
        });
      }
    );
  }

  calculateProfit(value: StockOut): void {
    let wareQty = new Decimal(value.warehouseQuantity);
    let storeQty = new Decimal(value.storeQuantity);
    let unitPurchasePrice = new Decimal(value.unitPurchasePrice);
    let totalSellingPrice = new Decimal(value.totalSellingPrice);
    value.totalQty = +wareQty.plus(storeQty);

    switch (value.trx) {
      case "GUDANG":
        value.totalPurchasePrice = +wareQty.times(unitPurchasePrice);
        value.unitSellingPrice = +totalSellingPrice.dividedBy(wareQty);
        value.profit = +totalSellingPrice.minus(new Decimal(value.totalPurchasePrice));
        break;
      case "TOKO":
        value.totalPurchasePrice = +storeQty.times(unitPurchasePrice);
        value.unitSellingPrice = +totalSellingPrice.dividedBy(storeQty);
        value.profit = +totalSellingPrice.minus(new Decimal(value.totalPurchasePrice));
        break;
    }
  }

}
