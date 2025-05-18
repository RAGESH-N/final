import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
// import { AuthGuard } from './guards/auth.guard';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddRestaurantComponent } from './pages/add-restaurant/add-restaurant.component'; 
import { ManageRestaurantsComponent } from './pages/manage-restaurants/manage-restaurants.component'; 
import { RestaurantSigninComponent } from './pages/restaurant-signin/restaurant-signin.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component'; // Import the RestaurantComponent
import { ViewCartComponent } from './pages/view-cart/view-cart.component';
const routes: Routes = [
  { path: '', component: WelcomeComponent },// Default route
   { path: 'welcome', component: WelcomeComponent }, 
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'signup', component: SignupComponent }, // Signup page
  { path: 'home', component: HomeComponent  }, // Home page (protected by AuthGuard)
  { path: 'profile', component: ProfileComponent}, // Profile page (protected by AuthGuard)
   { path: 'admin', component: AdminComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }, // Forgot Password page
  { path: 'add-restaurant', component: AddRestaurantComponent },
   { path: 'manage-restaurants', component: ManageRestaurantsComponent},
    { path: 'restaurant-signin', component: RestaurantSigninComponent },
    { path: 'view-restaurant', component: ViewRestaurantComponent },
    {path: 'restaurant', component: RestaurantComponent}, // Restaurant page
    { path: 'view-cart', component: ViewCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}