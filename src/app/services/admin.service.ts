import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/admin'; // Base URL for admin-related APIs

  constructor(private http: HttpClient) {}

  // Fetch all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  // Add a new user
  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }

  // Update a user
  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${userId}`, user);
  }

  // Delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${userId}`);
  }
}