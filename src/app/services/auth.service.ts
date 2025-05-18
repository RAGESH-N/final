import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Clear admin session and redirect to login page
  logout(): void {
    // Clear admin-related data from localStorage or sessionStorage
    localStorage.removeItem('adminToken'); // Adjust the key if you're storing the token differently
    this.router.navigate(['/login']); // Redirect to the login page
  }

  // Check if admin is logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('adminToken'); // Adjust the key if needed
  }
}