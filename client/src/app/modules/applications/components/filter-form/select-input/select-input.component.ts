import { Component, Input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {
  ECoursesFormat,
  ECoursesType,
} from '../../../../../enums/application-enums';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <mat-select class="flex items-start">
        @for (format of selectedValue; track format) {
          <mat-option value="selectedValue">{{ format }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectInputComponent implements OnInit {
  @Input()
  dataEnums: string;

  label: string;
  selectedValue: string[];

  someArray = ['online', 'offline'];

  ngOnInit() {
    switch (this.dataEnums) {
      case 'courseFormat':
        this.label = 'All formats';
        this.selectedValue = Object.keys(ECoursesFormat).map(
          key => ECoursesFormat[key]
        );
        break;
      case 'coursesType':
        this.label = 'All types';
        this.selectedValue = Object.keys(ECoursesType).map(
          key => ECoursesType[key]
        );
        break;
    }
  }
}
