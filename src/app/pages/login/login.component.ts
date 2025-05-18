import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  generatedCode: string = '';
  captchaError: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
    this.refreshCaptcha();
  }

  refreshCaptcha(): void {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    this.generatedCode = '';
    for (let i = 0; i < 6; i++) {
      this.generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captchaError = '';
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { identifier, password, captcha } = this.loginForm.value;

    if (captcha !== this.generatedCode) {
      this.captchaError = 'Incorrect captcha. Please try again.';
      this.refreshCaptcha();
      return;
    }

    this.http.post('http://localhost:3000/api/users/login', { identifier, password }).subscribe(
      (response: any) => {
        alert('Login successful!');
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('profilePhoto', response.profilePhoto);
        // localStorage.setItem('userCity', response.restaurant.city); // Or use the correct property from your backend
        this.router.navigate(['/home']);
      },
      (error) => {
        alert(error.error?.message || 'Login failed. Please try again.');
      }
    );
  }
}
