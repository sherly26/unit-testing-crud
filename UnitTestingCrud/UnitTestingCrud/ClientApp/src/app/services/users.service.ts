import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  createUser(userModel: User) {
    return this.httpClient.post(`api/users`, userModel).toPromise();
  }

  search(username) {
    return this.httpClient.get(`api/users/${username}`).toPromise();
  }

  updateUser(userToUpdateModel: User) {
    return this.httpClient.patch(`api/users`, userToUpdateModel).toPromise();
  }

  getUsers() {
    return this.httpClient.get(`api/users/users`).toPromise();
  }

  deleteUser(username: string) {
    return this.httpClient.delete(`api/users/${username}`).toPromise();
  }
}
