import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { ToastNotificationService } from '../services/toast-notification.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['user', 'name', 'lastname', 'email', 'phone', 'address'];
  userListArray: User[];
  updateScreen: CreateUserComponent;

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

  goToUpdateUserScreen(user: User) {
    try {
      this.updateScreen.userToUpdate = user;
      this.router.navigate(['/create-user']);
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error actualizando el usuario.', error);
    }
  }
}
