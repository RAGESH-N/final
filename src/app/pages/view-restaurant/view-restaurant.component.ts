import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchTerm: string = '';

  editedRestaurantId: string | null = null;
  editCache: any = {};

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        this.filteredRestaurants = data;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  searchRestaurants(): void {
    if (!this.searchTerm) {
      this.filteredRestaurants = this.restaurants;
      return;
    }
    const lowerTerm = this.searchTerm.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(r =>
      r.restaurantName && r.restaurantName.toLowerCase().includes(lowerTerm)
    );
  }

  startEdit(restaurant: any): void {
    this.editedRestaurantId = restaurant._id;
    this.editCache = { ...restaurant }; // shallow copy for editing
  }

  cancelEdit(): void {
    this.editedRestaurantId = null;
    this.editCache = {};
  }

  saveEdit(id: string): void {
    this.restaurantService.updateRestaurant(id, this.editCache).subscribe(
      (res) => {
        this.editedRestaurantId = null;
        this.editCache = {};
        this.loadRestaurants();
      },
      (error) => {
        alert('Error saving restaurant.');
        console.error('Save error:', error);
      }
    );
  }

  deleteRestaurant(id: string): void {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe(
        () => this.loadRestaurants(),
        (error) => {
          alert('Error deleting restaurant.');
          console.error('Delete error:', error);
        }
      );
    }
  }
}