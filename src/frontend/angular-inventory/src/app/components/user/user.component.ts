import {Component, OnInit} from '@angular/core';
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SiteTemplateComponent} from "../template/site-template/site-template.component";
import {NgForm} from "@angular/forms";
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  users: User[] = [];
  user?: User;
  roles = Object.keys(Roles);
  toastType: string = '';
  toastMessage?: string;

  constructor(private userService: UserService,
              private modal: NgbModal,
              private templateComponent: SiteTemplateComponent) {
  }

  ngOnInit(): void {
    this.templateComponent.activeId = 11;
    this.templateComponent.title = 'Tambah User';
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }

  onAddUser(addForm: NgForm): void {
    addForm.value.name = addForm.value.name.toUpperCase();

    const salt = bcrypt.genSaltSync(10);
    addForm.value.password = bcrypt.hashSync(addForm.value.password, salt);

    this.userService.addUser(addForm.value).subscribe(
      () => {
        this.getUsers();
        this.toastType = 'success';
        this.toastMessage = "menyimpan";
      }
    );
  }

  onUpdateUser(user: User): void {
    user.name = user.name.toUpperCase();

    this.userService.updateUser(user).subscribe(
      () => {
        this.getUsers();
        this.toastType = 'success';
        this.toastMessage = "mengubah";
      }
    );
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.getUsers();
        this.toastType = 'success';
        this.toastMessage = "menghapus";
      }
    );
  }

  openAddModal(content: any) {
    this.modal.open(content);
    document.getElementById('addName')?.focus();
  }

  openUpdateModal(content: any, user: User) {
    this.user = user;
    this.modal.open(content);
    document.getElementById('updateName')?.focus();
  }

  openDeleteModal(content: any, user: User) {
    this.user = user;
    this.modal.open(content);
    document.getElementById('delete')?.focus();
  }

}

enum Roles {
  ADMIN = "ADMIN",
  USER = "USER"
}
