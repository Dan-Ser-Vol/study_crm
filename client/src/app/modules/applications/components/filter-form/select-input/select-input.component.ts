import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {
  ECourses,
  ECoursesFormat,
  ECoursesType,
  EGroups,
  EStatus,
} from '../../../../../enums/application-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApplicationsService } from '../../../../../services';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
  ],
  templateUrl: './select-input.component.html',
})
export class SelectInputComponent implements OnInit {
  @Input()
  dataEnums: string;
  formData: FormGroup;

  formOptions = [
    { controlName: 'course_format', label: 'All formats' },
    { controlName: 'course_type', label: 'All types' },
    { controlName: 'status', label: 'All statuses' },
    { controlName: 'group', label: 'All groups' },
    { controlName: 'course', label: 'All courses' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private applicationsService: ApplicationsService
  ) {}

  ngOnInit() {
    this.formData = this.formBuilder.group({
      course_format: [''],
      course_type: [''],
      status: [''],
      group: [''],
      course: [''],
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      age: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  onselect(event: MatSelectChange) {
    if (event.value) {
      this.formOptions.forEach(option => {
        if (event.value === option.label) {
          this.formData.get(option.controlName)?.setValue('');
        }
      });
    }
  }

  getEnumValues(enumName: string): string[] {
    const enumObject = this.getEnumByName(enumName);
    return Object.values(enumObject);
  }

  getEnumByName(enumName: string): any {
    switch (enumName) {
      case 'Formats':
        return ECoursesFormat;
      case 'Types':
        return ECoursesType;
      case 'Statuses':
        return EStatus;
      case 'Groups':
        return EGroups;
      case 'Courses':
        return ECourses;
      default:
        return {};
    }
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
      this.applicationsService.setFilterItems({ ...newFilter });
    }
  }

  resetForm() {
    this.formData.reset();
    this.applicationsService.setFilterItems(null);
  }
}
