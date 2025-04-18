// src/app/create-user/create-user.component.ts
import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  newUser = { username: '', password: '' };
  message = '';
  errorMessage = '';

  constructor(private userService: UserApiService) {}

  createUser() {
    this.userService.createUser(this.newUser).subscribe(
      (response: { message: string; }) => {
        this.message = response.message;
        this.errorMessage = '';
        this.newUser = { username: '', password: '' }; // Clear the form
      },
      (error: { error: { message: string; }; }) => {
        this.errorMessage = error.error.message || 'Failed to create user.';
        this.message = '';
      }
    );
  }
}