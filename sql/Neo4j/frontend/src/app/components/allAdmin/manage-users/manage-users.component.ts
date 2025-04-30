// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AdminService } from '../../../services/admin.service';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MisService } from '../../../services/mis.service';
// import { User } from '../../../models/user.type';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// @Component({
//   selector: 'app-manage-users',
//   standalone: true,
//   imports: [CommonModule,ReactiveFormsModule],
//   templateUrl: './manage-users.component.html',
//   styleUrls: ['./manage-users.component.css']
// })
// export class ManageUsersComponent implements OnInit {
//   users: any[] = [];
//   adminService = inject(AdminService);
//   misService=inject(MisService);

//   addUserForm: FormGroup;
  
//   constructor(private fb: FormBuilder,private router: Router ) {
//       this.addUserForm = this.fb.group({
//         userId: ['', [Validators.required, Validators.minLength(4)]],
//         password: ['', [Validators.required, Validators.minLength(6)]],
//         name:['', [Validators.required, Validators.minLength(6)]],
//       });
//   }

//   get userId() {
//     return this.addUserForm.get('userId');
//   }

//   get password() {
//     return this.addUserForm.get('password');
//   }

//   get name(){
//     return this.addUserForm.get('name');
//   }

//   ngOnInit(): void {
//     this.fetchUsers()
//   }

//   fetchUsers(): void {
//     this.adminService.getUsers().subscribe(
//       (data:any) => {
//         console.log(data)
//         console.log('Fetched Users:', data);
//         this.users = data;
//       },
//       error => {
//         console.error('Error fetching users:', error);
//       }
//     );
//   }

//   addUser(): void {
//     if (this.addUserForm.valid) {
//       const user: User = {
//         ID: this.addUserForm.value.userId,
//         password: this.addUserForm.value.password,
//         role: this.misService.getRole(this.addUserForm.value.userId),
//         name: this.addUserForm.value.name
//       };

//       this.adminService.addUser(user).pipe(
//         catchError((err) => {
//           console.error('User creation failed:', err);
//           alert('User creation failed. Please try again.');
//           return throwError(() => err);
//         })
//       )
//       .subscribe({
//         next: (response) => {
//           alert('User added successfully!');
//           this.addUserForm.reset();
//           this.fetchUsers();
//           this.router.navigate(['/admin-dashboard']); 
//         },
//         error: (err) => {
//           console.error('Error adding user:', err);
//           alert('An error occurred while adding the user.');
//         }
//       });
//     } else {
//       alert('Please fill the form correctly.');
//     }
//   }

//   deleteUserById(ID:string):void{

//   if (confirm("Are you sure you want to delete this user?")) {
//       this.adminService.deleteUserById(ID).pipe(
//         catchError((err) => {
//           console.error('User deletion failed:', err);
//           alert('User deletion failed. Please try again.');
//           return throwError(() => err);
//         })
//       )
//       .subscribe({
//         next: (response) => {
//           alert('User deleted successfully!');
//           this.fetchUsers();
//           this.router.navigate(['/admin-dashboard']); 
//         },
//         error: (err) => {
//           console.error('Error deleting user:', err);
//           alert('An error occurred while deleting the user.');
//         }
//       });
//     }  
//   }


// }

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MisService } from '../../../services/mis.service';
import { User } from '../../../models/user.type';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  adminService = inject(AdminService);
  misService = inject(MisService);
  
  addUserForm: FormGroup;
  editingUserId: string | null = null; // Stores ID of the user being edited

  constructor(private fb: FormBuilder, private router: Router) {
    this.addUserForm = this.fb.group({
      userId: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  get userId() {
    return this.addUserForm.get('userId');
  }

  get password() {
    return this.addUserForm.get('password');
  }

  get name(){
    return this.addUserForm.get('name');
  }

 
  fetchUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (data: any) => {
        console.log('Fetched Users:', data);
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  addOrUpdateUser(): void {
    if (this.addUserForm.valid) {
      const user: User = {
        ID: this.addUserForm.value.userId,
        password: this.addUserForm.value.password,
        role: this.misService.getRole(this.addUserForm.value.userId),
        name: this.addUserForm.value.name
      };

      if (this.editingUserId) {
        this.adminService.updateUser(this.editingUserId, user).pipe(
          catchError((err) => {
            console.error('User update failed:', err);
            alert('User update failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('User updated successfully!');
          this.resetForm();
          this.fetchUsers(); // Refresh users list
        });

      } else {
        // Add new user
        this.adminService.addUser(user).pipe(
          catchError((err) => {
            console.error('User creation failed:', err);
            alert('User creation failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('User added successfully!');
          this.resetForm();
          this.fetchUsers(); // Refresh users list
        });
      }
    } else {
      alert('Please fill the form correctly.');
    }
  }

  /** 🚀 Function to pre-fill form for editing */
  editUser(user: User): void {
    this.editingUserId = user.ID;
    this.addUserForm.patchValue({
      userId: user.ID,
      password: user.password, // Assuming password is editable
      name: user.name
    });
  }

  /** 🚀 Function to reset form after adding/updating */
  resetForm(): void {
    this.addUserForm.reset();
    this.editingUserId = null;
  }

  /** 🚀 Function to delete user */
  deleteUserById(ID: string): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.adminService.deleteUserById(ID).pipe(
        catchError((err) => {
          console.error('User deletion failed:', err);
          alert('User deletion failed. Please try again.');
          return throwError(() => err);
        })
      )
      .subscribe(() => {
        alert('User deleted successfully!');
        this.fetchUsers(); // Refresh users list
      });
    }
  }
}
