import {Component, OnInit} from '@angular/core';
import {Category} from "../../common/category";
import {CategoryService} from "../../services/category.service";
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  category?: Category;
  toastType: string = '';
  toastMessage?: string;

  constructor(private categoryService: CategoryService,
              private modalService: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 2;
    this.templateComponent.title = 'Kategori';
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
  }

  onAddCategory(addForm: NgForm): void {
    addForm.value.name = addForm.value.name.toUpperCase();

    this.categoryService.addCategory(addForm.value).subscribe(
      () => {
        this.getCategories();
        this.toastType = 'success';
        this.toastMessage = "menyimpan";
      }
    );
  }

  onUpdateCategory(category: Category): void {
    category.name = category.name.toUpperCase();

    this.categoryService.updateCategory(category).subscribe(
      () => {
        this.getCategories();
        this.toastType = 'success';
        this.toastMessage = "mengubah";
      }
    );
  }

  // onDeleteCategory(id: number): void {
  //   this.categoryService.deleteCategory(id).subscribe(
  //     () => {
  //       this.getCategories();
  //       this.toastType = 'success';
  //       this.toastMessage = "menghapus";
  //     }
  //   );
  // }

  openAddModal(content: any) {
    this.modalService.open(content);
    document.getElementById('addName')?.focus();
  }

  openEditModal(content: any, category: Category) {
    this.category = category;
    this.modalService.open(content);
    document.getElementById('editName')?.focus();
  }

  openDeleteModal(content: any, category: Category) {
    this.category = category;
    this.modalService.open(content);
    document.getElementById('delete')?.focus();
  }
}
