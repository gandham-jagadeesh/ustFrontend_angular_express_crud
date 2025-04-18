import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { DisplayUserComponent } from './display-user/display-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

export const routes: Routes = [
    { path: 'add-user', component: AddUserComponent },
    { path: 'display-users', component: DisplayUserComponent },
    { path: 'edit-user/:id', component: UpdateUserComponent },
    { path: '', redirectTo: '/add-user', pathMatch: 'full' },
];
