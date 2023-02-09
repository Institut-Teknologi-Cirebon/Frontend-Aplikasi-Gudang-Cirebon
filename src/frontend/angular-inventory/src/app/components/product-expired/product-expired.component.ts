import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import {StockInService} from "../../services/stock-in.service";
import {StockIn} from "../../common/stock-in";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";

@Component({
  selector: 'app-stock-expired',
  templateUrl: './product-expired.component.html',
  styleUrls: ['./product-expired.component.css'],
  providers: [DatePipe]
})
export class ProductExpiredComponent implements OnInit{
  stockIns: StockIn[] = [];
  currentDate = new Date();
  date!: string;

  constructor(private stockInService: StockInService,
              private modalService: NgbModal,
              private templateComponent: SiteTemplateComponent,
              private datePipe: DatePipe) {
    this.date = datePipe.transform(this.currentDate, 'yyyy-MM-dd')!;
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 8;
    this.getExpiredProducts();
    this.templateComponent.title = 'Laporan Expired';
  }

  getExpiredProducts(): void {
    this.stockInService.getExpiredProducts(this.date).subscribe(
      data => {
        this.stockIns = data;
      }
    );
  }
}
