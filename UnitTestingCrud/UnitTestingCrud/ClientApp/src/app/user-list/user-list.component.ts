import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { ToastNotificationService } from '../services/toast-notification.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['user', 'name', 'lastname', 'email', 'phone', 'address'];
  userListArray: User[];

  constructor(
    public modal: MatDialog,
    private userService: UsersService,
    private toastNotificationService: ToastNotificationService,
    private router: Router,
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

  openDialog(username: string): void {
    const dialogRef = this.modal.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '300px',
      data: {
        message: `¿Está seguro que desea eliminar a ${username}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(username);
      }
    });
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
