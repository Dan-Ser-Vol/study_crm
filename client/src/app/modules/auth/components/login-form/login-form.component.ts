import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../services';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  hide = true;
  error: boolean;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginFormComponent>,
    protected toastr: ToastrService
  ) {}

  ngOnInit() {
    this._initForm();
  }

  _initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(4),
        Validators.max(8),
      ]),
    });
  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: () => {
          this.authService.me().subscribe();
          this.router.navigate(['applications']);
          this.dialogRef.close();
        },
        error: err => {
          this.error = err;
          this.toastr.error('Password or Email is wrong!', 'Login Error');
        },
        complete: () => {
          this.error = false;
          this.toastr.success('Success', 'Login status');
        },
      });
    } else {
      this.errorHandler();
    }
  }

  errorHandler() {
    if (this.form.controls['email'].hasError('required')) {
      this.toastr.error('Email is required', 'Login Error');
    }
    if (this.form.controls['email'].hasError('email')) {
      this.toastr.error(' Please enter a valid email address', 'Login Error');
    }
    if (this.form.controls['password'].hasError('required')) {
      this.toastr.error('Password is required', 'Login Error');
    }
    if (this.form.controls['password'].hasError('min')) {
      this.toastr.error('Password must have min 4 symbol', 'Login Error');
    }
    if (this.form.controls['password'].hasError('max')) {
      this.toastr.error('Password must have max 8 symbol', 'Login Error');
    }
  }
}
