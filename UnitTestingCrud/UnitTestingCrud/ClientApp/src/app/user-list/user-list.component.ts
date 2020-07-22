import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { ToastNotificationService } from '../services/toast-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['user', 'name', 'lastname', 'email', 'phone', 'address'];
  userListArray: User[];

  constructor(
    private userService: UsersService,
    private toastNotificationService: ToastNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  async getUsersList() {
    try {
      this.userListArray = await this.userService.getUsers();
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error obteniendo la lista de usuarios.', error);
    }
  }

  deleteUser(usernmae: string) {
    try {
      this.userService.deleteUser(usernmae);
      this.userListArray = this.userListArray.filter(x => x.username !== usernmae);
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error eliminando al usuario.', error);
    }
  }

  goToUpdateUserScreen(username: string) {
    try {
      this.userService.username = username;
      this.router.navigate(['/update-user']);
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error actualizando el usuario.', error);
    }
  }
}
