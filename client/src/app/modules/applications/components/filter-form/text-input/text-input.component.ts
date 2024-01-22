import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsService } from '../../../../../services';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent implements OnInit {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private applicationsService: ApplicationsService
  ) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      age: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      const newFilter = {};
      for (const key in this.formData.value) {
        const value = this.formData.value[key];
        if (value) {
          newFilter[key] = value;
        }
      }
      this.applicationsService.setFilterItems(newFilter);
      this.formData.reset();
    } else {
      console.log('Form is not valid');
    }
  }
}
