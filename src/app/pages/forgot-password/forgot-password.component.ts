import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  generatedOTP: string = ''; // Randomly generated OTP
  otpError: string = ''; // Error message for OTP validation
  passwordMismatch: boolean = false; // Password mismatch flag
  showOTPField: boolean = false; // Show OTP input field
  showResetFields: boolean = false; // Show Reset Password fields

  // Mock database with email and user information
  private mockUserData = {
    _id: '682301d699b64296dfe81f8d',
    username: 'ragiii',
    userid: 'ragi15i',
    phone: '1234567898',
    email: 'rageshtech5@gmail.com',
    address: 'pune',
    password: 'Ragesh@1',
    profilePhoto: null,
    createdAt: '2025-05-13T08:24:54.713+00:00'
  };

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      userId: ['', Validators.required],
      otp: [''],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Generate a random 6-character OTP
  private generateOTP(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
  }

  // Send OTP to the user's email
  sendOTP(): void {
    const userId = this.forgotPasswordForm.get('userId')?.value;

    if (userId !== this.mockUserData.userid) {
      alert('Invalid User ID. Please try again.');
      return;
    }

    const email = this.mockUserData.email; // Fetch the email from the mock data

    this.generatedOTP = this.generateOTP(); // Generate OTP
    this.showOTPField = true; // Show the OTP field

    // Use mailto for email (example)
    const emailBody = `Your OTP for resetting the password is: ${this.generatedOTP}`;
    const emailSubject = 'Password Reset OTP';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    alert(`OTP has been sent to the registered email address: ${email}`);
  }

  // Validate OTP
  validateOTP(): boolean {
    const enteredOTP = this.forgotPasswordForm.get('otp')?.value;
    if (enteredOTP !== this.generatedOTP) {
      this.otpError = 'Invalid OTP. Please try again.';
      return false;
    }
    this.otpError = '';
    this.showResetFields = true; // Show reset password fields after OTP validation
    return true;
  }

  // Handle form submission
  onSubmit(): void {
    if (!this.validateOTP()) {
      return; // Stop if OTP validation fails
    }

    const newPassword = this.forgotPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.forgotPasswordForm.get('confirmPassword')?.value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    // Simulate updating the password in the "database"
    this.mockUserData.password = newPassword; // Update the password in the mock user data
    alert('Password has been reset successfully.');
    this.forgotPasswordForm.reset();
    this.showOTPField = false;
    this.showResetFields = false;
  }
}