import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../user-api.service';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <h3>Add User</h3>
            <form (ngSubmit)="addUser()" #userForm="ngForm" class="form-group">
                <label for="name">Name:</label>
                <input type="text" [(ngModel)]="name" name="name" placeholder="Name" required class="form-control" />
                <div *ngIf="userForm.controls['name']?.invalid && userForm.controls['name']?.touched" class="alert alert-danger">Name is required</div>

                <label for="password">Password:</label>
                <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required class="form-control" />
                <div *ngIf="userForm.controls['password']?.invalid && userForm.controls['password']?.touched" class="alert alert-danger">Password is required</div>

                <button type="submit" [disabled]="userForm.invalid" class="btn btn-primary">Add</button>
            </form>
            <div *ngIf="message" class="alert alert-success">{{ message }}</div>
            <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        </div>
    `,
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
    name = '';
    password = '';
    message = '';
    errorMessage = '';

    constructor(private userService: UserApiService) {}

    addUser() {
        this.userService.createUser({ username: this.name, password: this.password }).subscribe(
            (response: any) => {
                console.log('AddUserComponent - Success:', response);
                this.message = response.message || 'User added successfully!';
                this.errorMessage = '';
                this.name = '';
                this.password = '';
            },
            (error: any) => {
                console.error('AddUserComponent - Error:', error);
                this.errorMessage = error.error?.message || 'Failed to add user.';
                this.message = '';
            }
        );
    }
}
