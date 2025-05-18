import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurantName: string = '';
  mailId: string = '';
  showAddDishForm: boolean = false; // Control visibility of Add Dish form
  editDishId: string | null = null; // ID of the dish being edited
  newDish = {
    dishName: '',
    description: '',
    price: 0,
    cuisine: '',
    type: '',
    image: null as File | null // Allow both File and null
  };
  updatedDish: any = {}; // Temporary object for editing
  dishes: any[] = []; // List of dishes

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.restaurantName = localStorage.getItem('restaurantName') ?? '';
    this.mailId = localStorage.getItem('mailId') ?? '';
    this.fetchDishes();
  }

  // Fetch all dishes for the restaurant
  fetchDishes(): void {
    this.http
      .get(`http://localhost:3000/api/dishes?restaurantName=${this.restaurantName}&mailId=${this.mailId}`)
      .subscribe({
        next: (response: any) => {
          this.dishes = response.dishes;
        },
        error: (error) => {
          console.error('Error fetching dishes:', error);
        }
      });
  }

  // Open the Add Dish form
  openAddDishForm(): void {
    this.showAddDishForm = true; // Show Add Dish form
    this.editDishId = null; // Ensure no dish is being edited
    this.newDish = {
      dishName: '',
      description: '',
      price: 0,
      cuisine: '',
      type: '',
      image: null
    }; // Reset the new dish form
  }

  // Handle file input change for adding or editing a dish
  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0] || null; // Safely handle null
    if (this.editDishId) {
      this.updatedDish.image = file; // Assign to the editing dish
    } else {
      this.newDish.image = file; // Assign to the new dish
    }
  }

  // Add a new dish
  addDish(): void {
    const formData = new FormData();
    formData.append('dishName', this.newDish.dishName);
    formData.append('description', this.newDish.description);
    formData.append('price', this.newDish.price.toString());
    formData.append('cuisine', this.newDish.cuisine);
    formData.append('type', this.newDish.type);
    if (this.newDish.image) {
      formData.append('image', this.newDish.image); // Add the image file
    }
    formData.append('restaurantName', this.restaurantName);
    formData.append('mailId', this.mailId);

    this.http.post('http://localhost:3000/api/dishes', formData).subscribe({
      next: () => {
        alert('Dish added successfully!');
        this.fetchDishes(); // Refresh the dishes list
        this.showAddDishForm = false; // Hide the form
      },
      error: (error) => {
        console.error('Error adding dish:', error);
        alert('Failed to add dish. Please try again.');
      }
    });
  }

  // Open the inline edit form
  openEditForm(dish: any): void {
    this.editDishId = dish._id; // Set the ID of the dish being edited
    this.updatedDish = { ...dish }; // Create a copy of the dish data for editing
  }

  // Update the dish
  updateDish(): void {
    const formData = new FormData();
    formData.append('dishName', this.updatedDish.dishName);
    formData.append('description', this.updatedDish.description);
    formData.append('price', this.updatedDish.price.toString());
    formData.append('cuisine', this.updatedDish.cuisine);
    formData.append('type', this.updatedDish.type);
    if (this.updatedDish.image instanceof File) {
      formData.append('image', this.updatedDish.image); // Add new image file if changed
    }
    formData.append('restaurantName', this.restaurantName);
    formData.append('mailId', this.mailId);

    this.http.put(`http://localhost:3000/api/dishes/${this.editDishId}`, formData).subscribe({
      next: (response: any) => {
        alert('Dish updated successfully!');
        this.fetchDishes(); // Refresh the list of dishes
        this.editDishId = null; // Close the inline edit form
      },
      error: (error) => {
        console.error('Error updating dish:', error);
        alert('Failed to update dish. Please try again.');
      }
    });
  }

  // Delete a dish
  deleteDish(dishId: string): void {
    if (confirm('Are you sure you want to delete this dish?')) {
      this.http.delete(`http://localhost:3000/api/dishes/${dishId}`).subscribe({
        next: () => {
          alert('Dish deleted successfully!');
          this.fetchDishes(); // Refresh the dishes list
        },
        error: (error) => {
          console.error('Error deleting dish:', error);
          alert('Failed to delete dish. Please try again.');
        }
      });
    }
  }

  // Sign out
  signOut(): void {
    localStorage.clear(); // Clear all stored data
    this.router.navigate(['/welcome']); // Redirect to the login page
  }

  // Cancel adding or editing a dish
  cancelForm(): void {
    this.showAddDishForm = false; // Hide Add Dish form
    this.editDishId = null; // Cancel editing
  }
}