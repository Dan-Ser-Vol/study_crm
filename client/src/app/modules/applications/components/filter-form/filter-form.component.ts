import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import {
  ECourses,
  ECoursesFormat,
  ECoursesType,
  EStatus,
} from '../../../../enums/application-enums';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TextInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
})
export class FilterFormComponent {
  label: string;
  coursesFormat: ECoursesFormat;
  coursesType: ECoursesType;
  courses: ECourses;
  status: EStatus;
  protected readonly ECoursesFormat = ECoursesFormat;
}
