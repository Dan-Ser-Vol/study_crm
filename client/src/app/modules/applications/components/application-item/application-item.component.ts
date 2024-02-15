import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApplication, IManager } from '../../../../interfaces';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MessageFormComponent } from '../message-form/message-form.component';
import { CommentService } from '../../../../services';

@Component({
  selector: 'app-application-item',
  standalone: true,
  templateUrl: './application-item.component.html',
  styleUrl: './application-item.component.scss',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MessageFormComponent,
  ],
})
export class ApplicationItemComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() me!: IManager;
  @Input() application!: IApplication;
  @Input() applications!: IApplication[];
  manager: IManager | null;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    if (this.application.manager && this.application.manager.name) {
      this.manager = this.application.manager;
    }
  }
  onManagerUpdated(updatedManager: IManager) {
    this.manager = updatedManager;
  }
}
