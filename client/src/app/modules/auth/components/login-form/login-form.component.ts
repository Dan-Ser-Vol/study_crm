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
})
export class LoginFormComponent implements OnInit {
  hide = true;
  error = false;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginFormComponent>
  ) {}

  ngOnInit() {
    this._initForm();
  }

  _initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['orders']);
        this.dialogRef.close();
      },
      error: err => {
        console.log(err);
        this.error = true;
      },
      complete: () => {
        this.error = false;
      },
    });
  }
}
