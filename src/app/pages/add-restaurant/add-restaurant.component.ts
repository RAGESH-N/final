import { Component } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
restaurant = {
  restaurantName: '',
  shopOwnerName: '',
  shopAddress: '',
  fssaiCode: '',
  aadharNumber: '',
  phoneNumber: '',
  bankAccountNumber: '',
  password: '',
  mailId: '',
  city: '',         // New field
  geoLocation: ''   // New field
};

  constructor(private restaurantService: RestaurantService) {}

  addRestaurant(): void {
    this.restaurantService.addToDecision(this.restaurant).subscribe(
      (response) => {
        alert('Restaurant details stored successfully!'); // Show success alert
        this.clearForm(); // Clear the form after successful submission
      },
      (error) => {
        console.error('Error storing restaurant details:', error); // Log any errors
        alert('Failed to store restaurant details. Please try again.'); // Show error alert
      }
    );
  }

clearForm(): void {
  this.restaurant = {
    restaurantName: '',
    shopOwnerName: '',
    shopAddress: '',
    fssaiCode: '',
    aadharNumber: '',
    phoneNumber: '',
    bankAccountNumber: '',
    password: '',
    mailId: '',
    city: '',
    geoLocation: ''
  };
}
}