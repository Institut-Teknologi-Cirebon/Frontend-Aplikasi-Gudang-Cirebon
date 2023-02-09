import {Component} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {registerLocaleData} from "@angular/common";
import localeID from "@angular/common/locales/id";

@Component({
  selector: 'app-base-template',
  templateUrl: './site-template.component.html',
  styleUrls: ['./site-template.component.css']
})
export class SiteTemplateComponent {
  isMenuCollapsed = true;
  activeId?: number;
  title: string = '';



  constructor(private userService: UserService) {
    registerLocaleData(localeID);
  }

  logout() {
    this.userService.logout();
  }


  sidebarToggle()
  {
    //toggle sidebar function
    window.document.body.classList.toggle('toggle-sidebar');
  }
}
