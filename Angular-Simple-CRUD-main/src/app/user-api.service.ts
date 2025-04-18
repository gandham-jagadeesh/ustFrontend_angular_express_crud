import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) {}

    createUser(userData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiUrl, userData, { headers });
    }

    getAllUsers(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getUserById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    updateUser(id: string, userData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.apiUrl}/${id}`, userData, { headers });
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}