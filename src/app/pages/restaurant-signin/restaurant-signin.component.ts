import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-signin',
  templateUrl: './restaurant-signin.component.html',
  styleUrls: ['./restaurant-signin.component.css']
})
export class RestaurantSigninComponent {
  restaurant = {
    restaurantName: '',
    mailId: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSignIn(): void {
    // Simulated API call to verify restaurant credentials
    this.http.post('http://localhost:3000/api/restaurants/signin', this.restaurant).subscribe({
      next: (response: any) => {
        alert(response.message); // Optional success alert

        // Store restaurantName and mailId in localStorage
        localStorage.setItem('restaurantName', this.restaurant.restaurantName);
        localStorage.setItem('mailId', this.restaurant.mailId);

        // Navigate to the Restaurant Page
        this.router.navigate(['/restaurant']);
      },
      error: (error) => {
        this.errorMessage = error.error.message; // Display error message if sign-in fails
      }
    });
  }
}