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
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackBar: SnackbarService
  ) {}
  signInForm!: FormGroup;

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  loginUser() {
    const data = this.signInForm.value;
    const newData = {
      email: data.email,
      password: data.password,
    };
    this.auth.loginUser(newData).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.snackBar.openSnackBar('Logged In Successfully');

          this.snackBar.onSnackBarDismissed = () => {
            this.signInForm.reset();
            this.router.navigate(['/home']);
          };
        } else if (response.code === 401) {
          this.snackBar.openSnackBar(response.message);
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.snackBar.openSnackBar('An error occurred. Please try again.');
      }
    );
  }
}
