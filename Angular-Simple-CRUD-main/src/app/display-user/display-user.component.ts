import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-display-user',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h3>User List</h3>
        <div *ngIf="loading">Loading users...</div>
        <div *ngIf="error" class="error">{{ error }}</div>
        <div *ngIf="users && users.length > 0">
            <ul>
                <li *ngFor="let user of users">
                    {{ user.username }}
                    <button (click)="editUser(user._id)">Edit</button>
                    <button (click)="deleteUser(user._id)">Delete</button>
                </li>
            </ul>
        </div>
        <div *ngIf="users && users.length === 0">No users to display.</div>
    `,
    styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
    users: any[] = [];
    loading = true;
    error = '';

    constructor(private userService: UserApiService, private router: Router) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.getAllUsers().subscribe(
            (data: any[]) => {
                this.users = data;
                this.loading = false;
            },
            (error: any) => {
                this.error = error.error?.message || 'Failed to retrieve users.';
                this.loading = false;
                console.error(error);
            }
        );
    }

    editUser(id: string) {
        this.router.navigate(['/edit-user', id]);
    }

    deleteUser(id: string) {
        this.userService.deleteUser(id).subscribe(
            (response: any) => {
                console.log(response);
                this.getUsers();
            },
            (error: any) => {
                this.error = error.error?.message || 'Failed to delete user.';
                console.error(error);
            }
        );
    }
}