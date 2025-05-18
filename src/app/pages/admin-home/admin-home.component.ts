import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  users: any[] = []; // Array to store user details
  editingUser: any = null; // Store the user being edited
  newUser: any = {}; // Store the new user details
  isAddingUser: boolean = false; // Flag to control Add User form visibility

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch users from the backend
  fetchUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data; // Assign the fetched user data
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Show the Add User form
  startAddUser(): void {
    this.isAddingUser = true;
    this.newUser = {}; // Reset the new user object
  }

  // Add a new user
  addUser(): void {
    this.newUser.createdAt = new Date().toISOString();
    this.adminService.addUser(this.newUser).subscribe(
      (data) => {
        alert('User added successfully');
        this.newUser = {}; // Clear the form
        this.isAddingUser = false; // Hide the Add User form
        this.fetchUsers(); // Refresh the user list
      },
      (error) => {
        console.error('Error adding user:', error);
        alert('Failed to add user');
      }
    );
  }

  // Cancel adding a user
  cancelAddUser(): void {
    this.isAddingUser = false; // Hide the Add User form
    this.newUser = {}; // Clear the form
  }

  // Start editing a user
  editUser(user: any): void {
    this.editingUser = { ...user }; // Create a copy of the user to avoid modifying the original
  }

  // Validate fields before saving
  validateFields(user: any): boolean {
    if (
      !user.username ||
      !user.userid ||
      !user.phone ||
      !user.email ||
      !user.address ||
      !user.password
    ) {
      alert('All fields are required. Please fill in all details.');
      return false;
    }
    return true;
  }

  // Save the edited user
  saveUser(): void {
    if (this.editingUser) {
      // Check if all fields are filled
      if (!this.validateFields(this.editingUser)) {
        return; // Stop if validation fails
      }

      this.adminService.updateUser(this.editingUser._id, this.editingUser).subscribe(
        (data) => {
          alert('User updated successfully');
          this.fetchUsers(); // Refresh the user list
          this.editingUser = null; // Exit edit mode
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user');
        }
      );
    }
  }

  // Cancel editing a user
  cancelEdit(): void {
    this.editingUser = null; // Exit edit mode without saving
  }

  // Delete a user
  deleteUser(userId: string): void {
    this.adminService.deleteUser(userId).subscribe(
      (data) => {
        alert('User deleted successfully');
        this.fetchUsers(); // Refresh the user list
      },
      (error) => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    );
  }

  // Sign out the admin
  signOut(): void {
    const confirmation = confirm('Are you sure you want to sign out?');
    if (confirmation) {
      // Clear session or token (if stored in localStorage or sessionStorage)
      localStorage.clear();

      // Redirect to login page
      this.router.navigate(['/welcome']);
    }
  }
   // Method to navigate to the Manage Restaurants page
  navigateToManageRestaurants(): void {
    this.router.navigate(['/manage-restaurants']); // Ensure this route exists in your routing module
  }
}