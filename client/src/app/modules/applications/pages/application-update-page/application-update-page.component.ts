import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFormComponent } from './update-form/update-form.component';
import { ActivatedRoute } from '@angular/router';
import { IApplication } from '../../../../interfaces';
import { ApplicationsService } from '../../../../services';

@Component({
  selector: 'app-application-update-page',
  standalone: true,
  imports: [],
  templateUrl: './application-update-page.component.html',
  styleUrl: './application-update-page.component.scss',
})
export class ApplicationUpdatePageComponent implements OnInit {
  application: IApplication;
  constructor(
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.appService.getById(id).subscribe(value => {
        this.application = value;
        this.matDialog.open(UpdateFormComponent, {
          disableClose: true,
          enterAnimationDuration: '0.5s',
          exitAnimationDuration: '0.5s',
          hasBackdrop: false,
          data: {
            application: this.application,
          },
        });
      })
    );
  }
}
