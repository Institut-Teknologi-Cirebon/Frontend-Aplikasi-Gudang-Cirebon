import {Component, OnInit} from '@angular/core';
import {Category} from "../../common/category";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  category?: Category;
  products: Product[] = [];
  id: number = +this.route.snapshot.paramMap.get('id')!;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 2;
    this.getCategory();
    this.getProductsFromCategory();
    this.templateComponent.title = 'Data Barang';
  }

  getCategory() {
    this.categoryService.getCategory(this.id).subscribe(
      data => {
        this.category = data;
      }
    );
  }

  getProductsFromCategory() {
    this.categoryService.getProductsFromCategory(this.id).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
