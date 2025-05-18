import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit, AfterViewInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  // For location/map
  latitude: number = 0;
  longitude: number = 0;
  city: string = 'Unknown';
  area: string = 'Unknown';
  street: string = 'Unknown';
  pincode: string = 'Unknown';
  map: any;
  userMarker: any;

  // For manual restaurant coordinate input
  restaurantGeoLocation: string = ''; // e.g. "18.5496358,73.9421769"
  manualDistance: number | null = null;
  manualError: string = '';
  manualUserLat: number = 0;
  manualUserLon: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCart();
  }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [20, 78], // Center of India as default
      zoom: 5,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  fetchCart() {
    const userId = localStorage.getItem('userId');
    this.http.get<any[]>(`http://localhost:3000/api/cart/user/${userId}`).subscribe({
      next: (data) => {
        this.cartItems = data;
        this.calculateTotal();
      },
      error: (err) => console.error('Error fetching cart:', err)
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
  }

  updateQuantity(cartItem: any, newQuantity: number) {
    if (newQuantity < 1) return;
    cartItem.quantity = newQuantity;
    this.calculateTotal();
    this.http.patch(`http://localhost:3000/api/cart/${cartItem._id}`, { quantity: newQuantity }).subscribe({
      next: () => {},
      error: (err) => {
        alert('Error updating quantity');
        console.error(err);
      }
    });
  }

  removeItem(item: any) {
    if (!item._id) {
      alert('Invalid cart item ID');
      return;
    }
    this.http.delete(`http://localhost:3000/api/cart/${item._id}`).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i._id !== item._id);
        this.calculateTotal();
      },
      error: (err) => {
        alert('Error removing cart item');
        console.error(err);
      }
    });
  }

  clearCart() {
    const userId = localStorage.getItem('userId');
    this.http.delete(`http://localhost:3000/api/cart/user/${userId}`).subscribe({
      next: () => {
        this.cartItems = [];
        this.calculateTotal();
      }
    });
  }

  proceedToPayment() {
    alert('Proceeding to payment! (Implement your payment logic here)');
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude ?? 0;
        this.longitude = position.coords.longitude ?? 0;

        // Reverse geocode to get address info
        this.http.get<any>(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitude}&lon=${this.longitude}`
        ).subscribe(response => {
          this.city = response.address.city || response.address.town || response.address.village || 'Unknown';
          this.area = response.address.suburb || response.address.neighbourhood || 'Unknown';
          this.street = response.address.road || 'Unknown';
          this.pincode = response.address.postcode || 'Unknown';
        });

        this.map.setView([this.latitude, this.longitude], 14);

        if (this.userMarker) {
          this.map.removeLayer(this.userMarker);
        }

        this.userMarker = L.marker([this.latitude, this.longitude], {
          icon: L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' })
        })
        .addTo(this.map)
        .bindPopup(`You are here: ${this.city}, ${this.area}, ${this.street}, ${this.pincode}`)
        .openPopup();
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }

  // Calculate distance when geoLocation is stored as "lat,lon" string
  getRestaurantDistance(item: any): number | null {
    if (
      this.latitude && this.longitude &&
      item.restaurant && typeof item.restaurant.geoLocation === 'string'
    ) {
      const [latStr, lonStr] = item.restaurant.geoLocation.split(',');
      const restLat = parseFloat(latStr.trim());
      const restLon = parseFloat(lonStr.trim());
      if (!isNaN(restLat) && !isNaN(restLon)) {
        return this.getDistanceFromLatLonInKm(this.latitude, this.longitude, restLat, restLon);
      }
    }
    return null;
  }

  // Manual input feature for user to enter/paste coordinates and get KM
  getManualKm() {
    this.manualError = '';
    this.manualDistance = null;
    if (!this.restaurantGeoLocation.includes(',')) {
      this.manualError = 'Enter valid coordinates (lat,lon)';
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.manualUserLat = pos.coords.latitude;
        this.manualUserLon = pos.coords.longitude;
        const [latStr, lonStr] = this.restaurantGeoLocation.split(',');
        const resLat = parseFloat(latStr.trim());
        const resLon = parseFloat(lonStr.trim());
        if (isNaN(resLat) || isNaN(resLon)) {
          this.manualError = 'Invalid restaurant coordinates';
          return;
        }
        this.manualDistance = this.getDistanceFromLatLonInKm(this.manualUserLat, this.manualUserLon, resLat, resLon);
      }, err => {
        this.manualError = 'Could not get your location';
      });
    } else {
      this.manualError = 'Geolocation not supported';
    }
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}