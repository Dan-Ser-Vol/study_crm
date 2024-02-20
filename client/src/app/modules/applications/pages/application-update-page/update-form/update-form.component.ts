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
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService,
    private applicationsService: ApplicationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.application = this.data.application;
    this.formData = this.formBuilder.group({
      course_format: [this.application.course_format],
      course_type: [this.application.course_type],
      already_paid: [this.application.already_paid],
      status: [this.application.status],
      group: [this.application.group],
      addGroup: [''],
      course: [this.application.course],
      name: [this.application.name],
      surname: [this.application.surname],
      email: [this.application.email],
      phone: [this.application.phone],
      age: [this.application.age],
      sum: [this.application.sum],
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
    if (this.formData.value && this.application) {
      this.applicationsService
        .update(this.application._id, this.formData.value)
        .subscribe(value => (this.application = value));
      this.closeModal();
    }
  }

  addGroup() {
    const valueFromForm = this.formData.value['addGroup'];
    if (
      valueFromForm &&
      !Object.values(EGroups).includes(valueFromForm.toUpperCase())
    ) {
      Object.defineProperty(EGroups, valueFromForm.toUpperCase(), {
        value: valueFromForm,
        enumerable: true,
        writable: false,
        configurable: true,
      });

      this.formData.patchValue({ group: valueFromForm });
      this.formData.patchValue({ addGroup: '' });
      this.toastrService.success('The group has been added');
    }
  }

  closeModal() {
    this.matDialog.closeAll();
    this.router.navigate(['']);
  }
}
