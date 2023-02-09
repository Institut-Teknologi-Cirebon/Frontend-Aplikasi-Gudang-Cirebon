import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Credential} from "../../common/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credential: Credential = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.userService.getToken()) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.userService.login(this.credential!).subscribe(
      () => {
        this.router.navigate(['']);
      }
    );
  }

}
