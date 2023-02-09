import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductComponent} from './components/product/product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {RouterModule, Routes} from "@angular/router";
import {CategoryComponent} from './components/category/category.component';
import {CategoryService} from "./services/category.service";
import {FormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoryDetailsComponent} from './components/category-details/category-details.component';
import {StockInComponent} from './components/stock-in/stock-in.component';
import {StockOutComponent} from './components/stock-out/stock-out.component';
import {ProductExpiredComponent} from './components/product-expired/product-expired.component';
import {StallComponent} from './components/stall/stall.component';
import {StallService} from "./services/stall.service";
import {StockComponent} from './components/stock/stock.component';
import {LoginComponent} from './components/login/login.component';
import {UserService} from "./services/user.service";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import {AuthGuard} from "./helpers/auth.guard";
import {LoginTemplateComponent} from "./components/template/login-template/login-template.component";
import { SiteTemplateComponent } from './components/template/site-template/site-template.component';
import { UserComponent } from './components/user/user.component';
import { CashAccountComponent } from './components/cash-account/cash-account.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import {CashAccountService} from "./services/cash-account.service";
import {CashFlowService} from "./services/cash-flow.service";
import { DotNumberDirective } from './helpers/dot-number.directive';
import { CurrencyNumberDirective } from './helpers/currency-number.directive';
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '', component: SiteTemplateComponent, canActivate: [AuthGuard], children: [
      {path: 'kategori', component: CategoryComponent},
      {path: 'kategori/:id/barang', component: CategoryDetailsComponent},
      {path: 'konsumen', component: StallComponent},
      {path: 'barang', component: ProductComponent},
      {path: 'pembelian', component: StockInComponent},
      {path: 'penjualan', component: StockOutComponent},
      {path: 'stok', component: StockComponent},
      {path: 'expired', component: ProductExpiredComponent},
      {path: 'pengguna', component: UserComponent},
      {path: 'rekening-kas', component: CashAccountComponent},
      {path: 'arus-kas', component: CashFlowComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}

    ]
  },

  {
    path: '', component: LoginTemplateComponent, children: [
      {path: 'login', component: LoginComponent},
    ]
  },

  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    StockInComponent,
    StockOutComponent,
    ProductExpiredComponent,
    StallComponent,
    StockComponent,
    LoginComponent,
    LoginTemplateComponent,
    SiteTemplateComponent,
    UserComponent,
    CashAccountComponent,
    CashFlowComponent,
    DotNumberDirective,
    CurrencyNumberDirective,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    ProductService,
    CategoryService,
    StallService,
    UserService,
    CashAccountService,
    CashFlowService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
