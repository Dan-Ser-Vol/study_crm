import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ApplicationsService,
  CommentService,
  ManagersService,
} from '../../../../services';
import { IApplication, IComment, IManager } from '../../../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.scss',
})
export class MessageFormComponent implements OnInit {
  @Input() element: IApplication;
  application: IApplication;
  @Input() me!: IManager;
  commentsId: string[] | null;
  comments: IComment[] = [];
  manager: IManager | null;
  commentForm: FormGroup;
  showComments: boolean = false;

  constructor(
    private commentService: CommentService,
    private managersService: ManagersService,
    private appService: ApplicationsService
  ) {}

  ngOnInit() {
    this.commentsId = this.element.msg?.map(item => item);
    if (this.commentsId && this.commentsId.length) {
      this.commentService.findCommentsById(this.commentsId).subscribe(value => {
        this.comments = value;
      });
    }

    this.commentForm = new FormGroup({
      message: new FormControl(''),
    });

    console.log(this.element);
  }

  onSubmit(applicationId: string) {
    if (this.commentForm.valid && this.commentForm.value) {
      const message = this.commentForm.value;
      this.commentService
        .createComment(applicationId, message)
        .subscribe(value => (this.comments = [value, ...this.comments]));
      this.showComments = true;
      this.commentForm.reset();
    }
    return;
  }

  deleteComment(applicationId: string, commentId: string) {
    this.commentService
      .deleteComment(applicationId, commentId)
      .subscribe(() => {
        const index = this.comments.findIndex(
          comment => comment._id === commentId
        );
        if (index !== -1) {
          this.comments.splice(index, 1);
        }
      });
  }
}
