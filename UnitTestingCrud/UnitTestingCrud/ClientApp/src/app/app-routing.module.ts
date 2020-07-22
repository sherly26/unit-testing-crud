import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreatedComponent } from './user-created/user-created.component';
import { LoginComponent } from './login/login.component';
import { UpdateUserComponent } from './user-list/update-user/update-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'created-user', component: UserCreatedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'update-user', component: UpdateUserComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
