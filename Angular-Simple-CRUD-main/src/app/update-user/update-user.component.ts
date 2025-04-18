import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-update-user',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
        <div class="container">
            <h3>Edit User</h3>
            <form (ngSubmit)="updateUser()" #userForm="ngForm" class="form-group">
                <label for="username">Username:</label>
                <input
                    type="text"
                    [(ngModel)]="user.username"
                    name="username"
                    placeholder="Username"
                    required
                    class="form-control"
                />
                <div *ngIf="userForm.controls['username']?.invalid && userForm.controls['username']?.touched" class="alert alert-danger">Username is required</div>

                <label for="password">Password:</label>
                <input
                    type="password"
                    [(ngModel)]="user.password"
                    name="password"
                    placeholder="Password"
                    class="form-control"
                />
                <button type="submit" [disabled]="userForm.invalid" class="btn btn-primary">Update</button>
            </form>
            <div *ngIf="message" class="alert alert-success">{{ message }}</div>
            <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <div *ngIf="loading" class="alert alert-info">Loading user details...</div>
        </div>
    `,
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
    user: any = { username: '', password: '' };
    message = '';
    errorMessage = '';
    userId: string = '';
    loading = false;

    constructor(
        private userService: UserApiService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.userId = this.route.snapshot.paramMap.get('id') || '';
        console.log('UpdateUserComponent - ngOnInit - userId:', this.userId);

        if (this.userId) {
            this.getUserDetails(this.userId);
        } else {
            this.loading = false;
        }
    }

    getUserDetails(id: string) {
        console.log('UpdateUserComponent - getUserDetails - id:', id);
        this.userService.getUserById(id).subscribe(
            (data: any) => {
                console.log('UpdateUserComponent - getUserDetails - data:', data);
                this.user = {
                    username: data.username,
                    password: data.password,
                };
                this.loading = false;
            },
            (error: any) => {
                this.errorMessage = 'Failed to load user details.';
                console.error('UpdateUserComponent - getUserDetails - error:', error);
                this.loading = false;
            }
        );
    }

    updateUser() {
        console.log('UpdateUserComponent - updateUser - user:', this.user);
        this.userService.updateUser(this.userId, this.user).subscribe(
            (response: any) => {
                this.message = response.message;
                this.errorMessage = '';
                this.router.navigate(['/display-users']);
            },
            (error: any) => {
                this.errorMessage = error.error?.message || 'Failed to update user.';
                console.error(error);
            }
        );
    }
}
