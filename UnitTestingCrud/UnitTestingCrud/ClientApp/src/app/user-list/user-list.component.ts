import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { ToastNotificationService } from '../services/toast-notification.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['user', 'name', 'lastname', 'email', 'phone', 'address'];
  userListArray: User[];
  ddataSource = new MatTableDataSource<User>(this.userListArray);
  constructor(
    private userService: UsersService,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  async getUsersList() {
    try {
      this.userListArray = await this.userService.getUsers();
      console.log(this.userListArray);
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error obteniendo la lista de usuarios.', error);
    }
  }
}
