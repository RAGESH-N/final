import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';
import { CartService } from 'src/app/services/cart.service'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId: string = '';
  profilePhoto: string = '';
  dishes: any[] = [];
  selectedType: string = '';
  priceSort: string = '';
  searchQuery: string = '';

  constructor(
    private router: Router,
    private dishService: DishService,
     private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || 'Guest';
    this.profilePhoto = localStorage.getItem('profilePhoto') || 'assets/default-profile.png';
    if (this.userId === 'Guest') {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch all dishes
    this.dishService.getAllDishes().subscribe(
      (data) => this.dishes = data,
      (error) => console.error('Error fetching dishes:', error)
    );
  }

  get filteredDishes() {
    let filtered = this.dishes;

    // Search by restaurant name OR dish name (case-insensitive, partial match)
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        (d.restaurantName && d.restaurantName.toLowerCase().includes(query)) ||
        (d.dishName && d.dishName.toLowerCase().includes(query))
      );
    }

    // Veg/Non-Veg filter
    if (this.selectedType) {
      filtered = filtered.filter(d =>
        d.type && d.type.toLowerCase() === this.selectedType.toLowerCase()
      );
    }

    // Price Sort
    if (this.priceSort === 'asc') {
      filtered = filtered.slice().sort((a, b) => Number(a.price) - Number(b.price));
    } else if (this.priceSort === 'desc') {
      filtered = filtered.slice().sort((a, b) => Number(b.price) - Number(a.price));
    }
    return filtered;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  onSignout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
 addToCart(dish: any): void {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('User not logged in!');
    return;
  }

  this.http.post('http://localhost:3000/api/cart/add', {
    userId,
    dish
  }).subscribe({
    next: () => alert('Added to cart!'),
    error: (err) => {
      alert('Error adding to cart');
      console.error(err);
    }
  });
}
}