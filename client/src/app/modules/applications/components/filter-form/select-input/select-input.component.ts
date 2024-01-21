import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {
  ECourses,
  ECoursesFormat,
  ECoursesType,
  EGroups,
  EStatus,
} from '../../../../../enums/application-enums';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule],
  template: `
    <mat-form-field style="margin-bottom: -22px ">
      <mat-label id="{{ dataEnums }}">{{ dataEnums }}</mat-label>
      <mat-select id="{{ dataEnums }}" class="flex items-start">
        @for (format of getEnumValues(dataEnums); track format) {
          <mat-option value="selectedValue">{{ format }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectInputComponent {
  @Input()
  dataEnums: string;

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
}
