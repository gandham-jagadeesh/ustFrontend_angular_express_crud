import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserById(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private idCounter = 1;

  addUser(user: Omit<User, 'id'>) {
    const newUser: User = { id: this.idCounter++, ...user };
    this.users.push(newUser);
    this.usersSubject.next(this.users);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next(this.users);
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    this.usersSubject.next(this.users);
  }
}
