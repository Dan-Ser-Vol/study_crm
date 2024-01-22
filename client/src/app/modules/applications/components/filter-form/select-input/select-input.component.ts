import { Component, Input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
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

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select-input.component.html',
})
export class SelectInputComponent implements OnInit {
  @Input()
  dataEnums: string;
  formData: FormGroup;

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
    });
  }

  getEnumValues(enumName: string): string[] {
    const enumObject = this.getEnumByName(enumName);
    return Object.values(enumObject);
  }

  getEnumByName(enumName: string): any {
    switch (enumName) {
      case 'All formats':
        return ECoursesFormat;
      case 'All types':
        return ECoursesType;
      case 'All statuses':
        return EStatus;
      case 'All groups':
        return EGroups;
      case 'All courses':
        return ECourses;
      default:
        return {};
    }
  }

  onsubmit() {
    if (this.formData.valid) {
      const newFilter = {};
      for (const key in this.formData.value) {
        const value = this.formData.value[key];
        if (value) {
          newFilter[key] = value;
          console.log(newFilter);
        }
      }
      this.applicationsService.setFilterItems(newFilter);
    }
  }

  resetForm() {
    this.formData.reset();
    this.applicationsService.setFilterItems(null);
  }
}
