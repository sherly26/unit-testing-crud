import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  signIn: FormGroup;
  constructor(
    private formBuilder: FormBuilder
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

}
