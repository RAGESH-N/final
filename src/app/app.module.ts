import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';


import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AddRestaurantComponent } from './pages/add-restaurant/add-restaurant.component';
import { ManageRestaurantsComponent } from './pages/manage-restaurants/manage-restaurants.component';
import { RestaurantSigninComponent } from './pages/restaurant-signin/restaurant-signin.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { AddDishComponent } from './pages/add-dish/add-dish.component';
import { ViewOrdersComponent } from './pages/view-orders/view-orders.component';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component';
import { ViewCartComponent } from './pages/view-cart/view-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    ForgotPasswordComponent,
    AdminHomeComponent,
    AddRestaurantComponent,
    ManageRestaurantsComponent,
    RestaurantSigninComponent,
    RestaurantComponent,
    AddDishComponent,
    ViewOrdersComponent,
    ViewRestaurantComponent,
    ViewCartComponent,
   
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule, // Add FormsModule here
    AppRoutingModule // Add AppRoutingModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }