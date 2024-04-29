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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private formBuilder1: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}
  // signInForm!: FormGroup;
  signUpForm!: FormGroup;
  signUpUsers: any[] = [];

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  toggleForm() {
    const container = this.elementRef.nativeElement.querySelector('.container');
    container.classList.toggle('active');
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('signUpUsers');
    this.signUpUsers = storedData ? JSON.parse(storedData) : [];
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.signUpForm = this.formBuilder1.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnf_password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  signIn() {
    // if (this.signInForm.valid) {
    //   const enteredUsername = this.signInForm.value.username;
    //   const enteredPassword = this.signInForm.value.password;

    //   const storedData = localStorage.getItem('signUpUsers');
    //   this.signUpUsers = storedData ? JSON.parse(storedData) : [];
    //   const user = this.signUpUsers.find(
    //     (u) => u.username === enteredUsername && u.password === enteredPassword
    //   );

    //   if (user) {
    //     console.log('Login successful!');
    //     this.router.navigate(['home']);
    //     this.signInForm.reset();
    //   } else {
    //     console.log('Invalid username or password!');
    //   }
    // } else {
    //   console.log('Form is invalid!');
    // }

    if (this.signInForm.valid) {
      this.auth.login(this.signInForm.value).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['/home']);
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.signUpUsers.push(formData);
      localStorage.setItem('signUpUsers', JSON.stringify(this.signUpUsers));
      console.log('Form submitted successfully!');
      this.signUpForm.reset();
      location.reload();
    } else {
      console.log('Form is invalid!');
    }
  }
}
