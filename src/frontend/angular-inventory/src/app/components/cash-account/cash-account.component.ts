import {Component, OnInit} from '@angular/core';
import {CashAccount} from "../../common/cash-account";
import {CashAccountService} from "../../services/cash-account.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-cash-account',
  templateUrl: './cash-account.component.html',
  styleUrls: ['./cash-account.component.css']
})
export class CashAccountComponent implements OnInit{

  cashAccounts: CashAccount[] = [];
  cashAccount?: CashAccount;
  toastType: string = '';
  toastMessage?: string;

  constructor(private cashAccountService: CashAccountService,
              private modal: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 9;
    this.getCashAccounts();
    this.templateComponent.title = 'Rekening Kas';
  }

  getCashAccounts(): void {
    this.cashAccountService.getCashAccounts().subscribe(
      (data: CashAccount[]) => {
        this.cashAccounts = data;
      }
    );
  }

  onAddCashAccount(addForm: NgForm): void {
    addForm.value.name = addForm.value.name.toUpperCase();

    this.cashAccountService.addCashAccount(addForm.value).subscribe(
      () => {
        this.getCashAccounts();
        this.toastType = 'success';
        this.toastMessage = "menyimpan";
      }
    );
  }

  onUpdateCashAccount(cashAccount: CashAccount): void {
    cashAccount.name = cashAccount.name.toUpperCase();

    this.cashAccountService.updateCashAccount(cashAccount).subscribe(
      () => {
        this.getCashAccounts();
        this.toastType = 'success';
        this.toastMessage = "mengubah";
      }
    );
  }

  // onDeleteCashAccount(id: number): void {
  //   this.cashAccountService.deleteCashAccount(id).subscribe(
  //     () => {
  //       this.getCashAccounts();
  //       this.toastType = 'success';
  //       this.toastMessage = "menghapus";
  //     }
  //   );
  // }

  openAddModal(content: any) {
    this.modal.open(content);
    document.getElementById('addName')?.focus();
  }

  openUpdateModal(content: any, cashAccount: CashAccount) {
    this.cashAccount = cashAccount;
    this.modal.open(content);
    document.getElementById('updateName')?.focus();
  }

  // openDeleteModal(content: any, cashAccount: CashAccount) {
  //   this.cashAccount = cashAccount;
  //   this.modal.open(content);
  //   document.getElementById('delete')?.focus();
  // }

}
