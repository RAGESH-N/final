import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any = {}; // Object to store user data
  errorMessage: string = ''; // Variable to store error messages

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (userId) {
      // Fetch user details from the backend
      this.http.get(`http://localhost:3000/api/users/profile/${userId}`).subscribe(
        (response: any) => {
          this.userData = response; // Assign the response to userData
        },
        (error) => {
          console.error('Error fetching profile details:', error);
          this.errorMessage = 'Failed to load profile details. Please try again.';
        }
      );
    } else {
      alert('User not logged in. Redirecting to login page...');
      this.router.navigate(['/login']);
    }
  }
}