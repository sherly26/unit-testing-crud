import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { User } from 'src/app/models/user';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() username: string;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(40)]],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      lastname: ['', [Validators.required, Validators.maxLength(40)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      phone: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.maxLength(40), Validators.email, Validators.required]],
      password: ['', [Validators.maxLength(60), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
      Validators.required, Validators.minLength(8)]]
    });
    this.searchUser();
  }

  setValue(property: string, value: any) {
    return this.form.get(property).setValue(value);
  }

  searchUser() {
    try {
      const username: string = this.userService.username;
      this.userService.search(username).then(userData => {
        this.setUserDataInFields(userData);
      }).catch(error => {
        this.toastNotificationService.showError('Ha ocurrido un error buscando el usuario.', error);
      });
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error buscando el usuario a actualizar.', error);
    }
  }

  setUserDataInFields(userData: User) {
    this.setValue('username', userData.username);
    this.setValue('name', userData.name);
    this.setValue('lastname', userData.lastname);
    this.setValue('address', userData.address);
    this.setValue('phone', userData.phone);
    this.setValue('email', userData.email);
    this.setValue('password', userData.password);
  }

  updateUser() {
    try {
      const userToUpdate = this.buildUser();
      this.userService.updateUser(userToUpdate);
      this.toastNotificationService.showSucessMessage('Actualización exitosa.', 'El usuario se ha actualizado correctamente.');
      this.router.navigate(['/user-list']);
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error actualizando el usuario.', error);
    }
  }

  buildUser(): User {
    const createUserRequest: User = {
      username: this.form.get('username').value,
      name: this.form.get('name').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      phone: this.form.get('phone').value,
      address: this.form.get('address').value
    };

    return createUserRequest;
  }

}
