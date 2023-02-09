import {Component, OnInit} from '@angular/core';
import {Stall} from "../../common/stall";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StallService} from "../../services/stall.service";
import {NgForm} from "@angular/forms";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";

@Component({
  selector: 'app-stall',
  templateUrl: './stall.component.html',
  styleUrls: ['./stall.component.css']
})
export class StallComponent implements OnInit{

  stalls: Stall[] = [];
  stall?: Stall;
  toastType: string = '';
  toastMessage?: string;

  constructor(private stallService: StallService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 3;
    this.getStalls();
    this.templateComponent.title = 'Konsumen';
  }

  getStalls(): void {
    this.stallService.getStalls().subscribe(
      (data: Stall[]) => {
        this.stalls = data;
      }
    );
  }

  onAddStall(addForm: NgForm): void {
    addForm.value.name = addForm.value.name.toUpperCase();

    this.stallService.addStall(addForm.value).subscribe(
      () => {
        this.getStalls();
        this.toastType = 'success';
        this.toastMessage = "menyimpan";
      }
    );
  }

  onUpdateStall(stall: Stall): void {
    stall.name = stall.name.toUpperCase();

    this.stallService.updateStall(stall).subscribe(
      () => {
        this.getStalls();
        this.toastType = 'success';
        this.toastMessage = "mengubah";
      }
    );
  }

  // onDeleteStall(id: number): void {
  //   this.stallService.deleteStall(id).subscribe(
  //     () => {
  //       this.getStalls();
  //       this.toastType = 'success';
  //       this.toastMessage = "menghapus";
  //     }
  //   );
  // }

  openAddModal(content: any) {
    this.modalService.open(content);
    document.getElementById('addName')?.focus();
  }

  openEditModal(content: any, stall: Stall) {
    this.stall = stall;
    this.modalService.open(content);
    document.getElementById('editName')?.focus();
  }

  openDeleteModal(content: any, stall: Stall) {
    this.stall = stall;
    this.modalService.open(content);
    document.getElementById('delete')?.focus();
  }

}
