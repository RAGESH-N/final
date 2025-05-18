import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  showAdminForm: boolean = false; // Track whether admin form is displayed
  adminLoginForm: FormGroup; // Admin login form group

  constructor(private fb: FormBuilder) {
    // Initialize the admin login form with validation
    this.adminLoginForm = this.fb.group({
      adminmail: ['', [Validators.required, Validators.email]], // Validate email
      adminid: ['', Validators.required], // Validate admin ID
      pass: ['', Validators.required], // Validate password
    });
  }

  // Toggle the visibility of the admin login form
  toggleAdminLogin(): void {
    this.showAdminForm = !this.showAdminForm;
  }

  // Handle admin login form submission
  onAdminLogin(): void {
    if (this.adminLoginForm.invalid) {
      alert('Please fill in all fields with valid data!');
      return;
    }

    const { adminmail, adminid, pass } = this.adminLoginForm.value;

    // Perform login logic here (e.g., send to backend for validation)
    console.log('Admin Login Details:', { adminmail, adminid, pass });

    // Simulate success response
    alert('Admin login successful!');
  }
}