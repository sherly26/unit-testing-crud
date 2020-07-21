import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { ToastNotificationService } from '../services/toast-notification.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @Input() userToUpdate;
  signIn: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {
    this.signIn = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(40)]],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      lastname: ['', [Validators.required, Validators.maxLength(40)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      phone: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.maxLength(40), Validators.email, Validators.required]],
      password: ['', [Validators.maxLength(60), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
      Validators.required, Validators.minLength(8)]]
    });
  }

  async createUser() {
    try {
      const userToCreate = await this.buildUser();
      await this.userService.createUser(userToCreate);
      this.router.navigate(['/created-user']);
    } catch (error) {
      this.toastNotificationService.showError('Ha ocurrido un error inesperado', error);
    }
  }

  buildUser(): User {
    const createUserRequest: User = {
      username: this.signIn.get('username').value,
      name: this.signIn.get('name').value,
      lastname: this.signIn.get('lastname').value,
      email: this.signIn.get('email').value,
      password: this.signIn.get('password').value,
      phone: this.signIn.get('phone').value,
      address: this.signIn.get('address').value
    };

    return createUserRequest;
  }

}
