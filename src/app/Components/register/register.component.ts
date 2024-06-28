import { Component, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private elementRef: ElementRef,
    private formBuilder1: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}
  signUpForm!: FormGroup;
  signUpUsers: any[] = [];

  ngOnInit(): void {
    const storedData = localStorage.getItem('signUpUsers');
    this.signUpUsers = storedData ? JSON.parse(storedData) : [];
    this.signUpForm = this.formBuilder1.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnf_password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  registerUser() {
    const data = this.signUpForm.value;
    this.auth.registerUser(data).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.snackBar.open('Registered a new user', 'Close', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        } else if (response.code === 401) {
          this.snackBar.open(response.message, 'Close', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.snackBar.open('An error occurred. Please try again.', 'Close', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }
}
