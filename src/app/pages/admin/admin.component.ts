import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  adminLoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Inject Angular Router
  ) {
    // Initialize the admin login form with validation
    this.adminLoginForm = this.fb.group({
      adminid: ['', Validators.required], // Validate admin ID
      pass: ['', Validators.required], // Validate password
    });
  }

  // Handle form submission
  onAdminLogin(): void {
    if (this.adminLoginForm.invalid) {
      alert('Please fill in all fields with valid data!');
      return;
    }

    const { adminid, pass } = this.adminLoginForm.value;

    // Send credentials to the backend for validation
    this.http.post('http://localhost:3000/api/admin/login', { adminid, pass }).subscribe(
      (response: any) => {
        alert(response.message); // Show success message
        this.router.navigate(['/admin-home']); // Navigate to admin homepage
      },
      (error) => {
        console.error('Login failed:', error);
        alert(error.error.message || 'An error occurred during login.');
      }
    );
  }
}