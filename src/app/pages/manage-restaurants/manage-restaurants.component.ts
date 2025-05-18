import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-restaurants',
  templateUrl: './manage-restaurants.component.html',
  styleUrls: ['./manage-restaurants.component.css']
})
export class ManageRestaurantsComponent implements OnInit {
  pendingRestaurants: any[] = []; // Store pending restaurants

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.loadPendingRestaurants();
  }

  // Load pending restaurants from the decision table
  loadPendingRestaurants(): void {
    this.restaurantService.getPendingRestaurants().subscribe(
      (data) => {
        this.pendingRestaurants = data;
      },
      (error) => {
        console.error('Error fetching pending restaurants:', error);
      }
    );
  }

  // Approve a restaurant
  approveRestaurant(id: string): void {
    this.restaurantService.approveRestaurant(id).subscribe(
      (response) => {
        alert('Restaurant approved successfully!');
        this.loadPendingRestaurants(); // Reload pending restaurants
      },
      (error) => {
        console.error('Error approving restaurant:', error);
        alert('Failed to approve restaurant. Please try again.');
      }
    );
  }

  // Reject a restaurant
  rejectRestaurant(id: string): void {
    this.restaurantService.rejectRestaurant(id).subscribe(
      (response) => {
        alert('Restaurant rejected successfully!');
        this.loadPendingRestaurants(); // Reload pending restaurants
      },
      (error) => {
        console.error('Error rejecting restaurant:', error);
        alert('Failed to reject restaurant. Please try again.');
      }
    );
  }

  // Navigate to the View Restaurant page
  navigateToViewRestaurant(): void {
    this.router.navigate(['/view-restaurant']); // Navigate to the View Restaurant page
  }
}