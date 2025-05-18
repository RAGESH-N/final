import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  captcha: string = ''; // Captcha text
  isCaptchaValid: boolean = true; // Captcha validation flag
  selectedFile!: File; // File for profile photo
  fileError: string = ''; // Error message for file validation

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateCaptcha(); // Generate captcha on component load

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      userid: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ], // Password pattern validation
      captchaInput: ['', Validators.required], // Captcha validation
    });
  }

  // Generate a random captcha
  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 })
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join('');
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // Allow files up to 2MB
      this.selectedFile = file;
      this.fileError = '';
    } else {
      this.fileError = 'File size must be less than 2MB.';
    }
  }

  // Submit the form
  onSubmit(): void {
    if (this.signupForm.value.captchaInput !== this.captcha) {
      this.isCaptchaValid = false;
      return; // Stop submission if captcha is invalid
    }
    this.isCaptchaValid = true;
  
    const formData = new FormData();
    Object.keys(this.signupForm.value).forEach((key) => {
      formData.append(key, this.signupForm.value[key]);
    });
    if (this.selectedFile) {
      formData.append('profilePhoto', this.selectedFile);
    }
  
    this.http.post('http://localhost:3000/api/users/signup', formData).subscribe(
      (response: any) => {
        alert(response.message);
        this.router.navigate(['/login']); // Navigate to login on success
      },
      (error) => {
        console.error('Error occurred:', error); // Log the error details
        alert(error.error.message || 'An error occurred.');
      }
    );
  }

  // Refresh captcha
  refreshCaptcha(): void {
    this.generateCaptcha(); // Generate a new captcha
    this.isCaptchaValid = true; // Reset captcha validation
    this.signupForm.controls['captchaInput'].reset(); // Clear the captcha input
  }
}