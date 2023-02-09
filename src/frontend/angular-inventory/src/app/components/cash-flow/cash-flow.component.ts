import {Component, OnInit} from '@angular/core';
import {CashFlow} from "../../common/cash-flow";
import {CashFlowService} from "../../services/cash-flow.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";
import {NgForm} from "@angular/forms";
import {CashAccount} from "../../common/cash-account";
import {CashAccountService} from "../../services/cash-account.service";
import Decimal from "decimal.js";

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  cashFlows: CashFlow[] = [];
  cashFlow?: CashFlow;
  cashAccounts: CashAccount[] = [];
  totalBalance: number = 0;
  today = new Date;
  toastType: string = '';
  toastMessage?: string;

  constructor(private cashFlowService: CashFlowService,
              private cashAccountService: CashAccountService,
              private modal: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 10;
    this.templateComponent.title = 'Arus Kas';
    this.getCashFlows();
    this.getCashAccounts();
  }

  getCashFlows(): void {
    this.cashFlowService.getCashFlows().subscribe(
      data => {
        this.cashFlows = data;
      }
    );
  }
  getCashAccounts(): void {
    this.cashAccountService.getCashAccounts().subscribe(
      data => {
        this.cashAccounts = data;
      }
    );
  }

  onAddCashFlow(addForm: NgForm): void {
    addForm.value.detail = addForm.value.detail.toUpperCase();
    addForm.value.amount = this.removeDotNumber(addForm.value.amount);

    this.cashFlowService.addCashFlow(addForm.value).subscribe(
      () => {
        this.getCashFlows();
        this.toastType = 'success';
        this.toastMessage = "menyimpan";
      }
    );
  }

  onUpdateCashFlow(updateForm: NgForm): void {
    updateForm.value.detail = updateForm.value.detail.toUpperCase();
    updateForm.value.amount = this.removeDotNumber(updateForm.value.amount);

    this.cashFlowService.updateCashFlow(updateForm.value).subscribe(
      () => {
        this.getCashFlows();
        this.toastType = 'success';
        this.toastMessage = "mengubah";
      }
    );
  }

  onDeleteCashFlow(id: number): void {
    this.cashFlowService.deleteCashFlow(id).subscribe(
      () => {
        this.getCashFlows();
        this.toastType = 'success';
        this.toastMessage = "menghapus";
      }
    );
  }

  openAddModal(content: any) {
    this.modal.open(content);
    document.getElementById('addDate')?.focus();
  }

  openUpdateModal(content: any, cashFlow: CashFlow) {
    this.cashFlow = cashFlow;
    this.modal.open(content);
    document.getElementById('updateDate')?.focus();
  }

  openDeleteModal(content: any, cashFlow: CashFlow) {
    this.cashFlow = cashFlow;
    this.modal.open(content);
    document.getElementById('delete')?.focus();
  }

  compareCashAccount(o1: CashAccount, o2: CashAccount): boolean {
    if (o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.name == o2.name;
  }

  calculateAmount(index: number, ca: CashAccount): number {
    let sum = new Decimal(0);
    for (let i = 0; i <= index; i++) {
      let amount = new Decimal(this.cashFlows[i].amount);

      if (this.cashFlows[i].type == 'KELUAR' && this.cashFlows[i].cashAccount.id == ca.id) {
        sum = sum.minus(amount);
      } else if (this.cashFlows[i].type == 'MASUK' && this.cashFlows[i].cashAccount.id == ca.id) {
        sum = sum.plus(amount);
      } else {
        sum = sum.plus(0);
      }
    }
    return sum.toNumber();
  }

  calculateBalance(ca: CashAccount): number {
    let sum = new Decimal(0);
    for (let i = 0; i < this.cashFlows.length; i++) {
      sum = new Decimal(this.calculateAmount(i, ca).toString());
    }
    return sum.toNumber();
  }

  calculateTotalBalance(): number {
    let total = new Decimal(0);
    for (let i = 0; i < this.cashAccounts.length; i++) {
      let balance = new Decimal(this.calculateBalance(this.cashAccounts[i]).toString());
      total = total.plus(balance);
    }
    return total.toNumber();
  }

  removeDotNumber(input: string): number {
    input = input.replace(/\./g, '');
    return Number(input);
  }

  addDotNumberCurrency(input: number): string {
    let inputString: string = String(input);
    inputString = inputString.replace(/[^0-9]/g, '');
    inputString = Number(inputString).toLocaleString('id-ID');
    return inputString;
  }

}
