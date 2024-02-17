import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsService } from '../../../../../services';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {
  ECourses,
  ECoursesFormat,
  ECoursesType,
  EGroups,
  EStatus,
} from '../../../../../enums/application-enums';
import { IApplication } from '../../../../../interfaces';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.scss',
})
export class UpdateFormComponent implements OnInit {
  application: IApplication;
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
    private matDialog: MatDialog,
    private router: Router,
    private applicationsService: ApplicationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      course_format: [this.data.application.course_format],
      course_type: [this.data.application.course_type],
      status: [this.data.application.status],
      group: [this.data.application.group],
      course: [this.data.application.course],
      name: [this.data.application.name],
      surname: [this.data.application.surname],
      email: [this.data.application.email],
      phone: [this.data.application.phone],
      age: [this.data.application.age],
      startDate: [this.data.application.startDate],
      endDate: [this.data.application.endDate],
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
      // this.applicationsService.setFilterItems({ });
    }
  }

  closeModal() {
    this.matDialog.closeAll();
    this.router.navigate(['']);
  }
}
