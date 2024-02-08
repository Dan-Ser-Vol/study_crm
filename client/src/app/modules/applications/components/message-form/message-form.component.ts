import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsService, ManagersService } from '../../../../services';
import { IApplication, IComment } from '../../../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { IManager, IUser } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.scss',
})
export class MessageFormComponent implements OnInit {
  @Input() element: IApplication;
  @Input() me!: IUser;
  commentsId: string[] | null;
  comments: IComment[] = [];
  manager: IManager;
  commentForm: FormGroup;

  constructor(
    private appService: ApplicationsService,
    private managersService: ManagersService
  ) {}

  ngOnInit() {
    this.commentsId = this.element.msg?.map(item => item);
    if (this.commentsId && this.commentsId.length) {
      this.appService.findCommentsById(this.commentsId).subscribe(value => {
        this.comments = value;
      });
    }

    this.commentForm = new FormGroup({
      message: new FormControl(''),
    });

    if (this.element.manager) {
      this.managersService.getById(this.element.manager).subscribe(value => {
        this.manager = value;
      });
    }
  }

  onSubmit(applicationId: string) {
    if (this.commentForm.valid && this.commentForm.value) {
      const message = this.commentForm.value;
      this.appService
        .createComment(applicationId, message)
        .subscribe(value => (this.comments = [value, ...this.comments]));
      this.commentForm.reset();
    }
    return;
  }

  deleteComment(applicationId: string, commentId: string) {
    this.appService.deleteComment(applicationId, commentId).subscribe(() => {
      const index = this.comments.findIndex(
        comment => comment._id === commentId
      );
      if (index !== -1) {
        this.comments.splice(index, 1);
      }
    });
  }
}
