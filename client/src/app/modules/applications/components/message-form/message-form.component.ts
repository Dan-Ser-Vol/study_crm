import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../../services';
import { IApplication, IComment, IManager } from '../../../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  @Output() managerUpdated: EventEmitter<IManager> = new EventEmitter<IManager>(
    null
  );
  @Input() me: IManager | null;
  @Input() manager: IManager | null;
  @Input() application!: IApplication;
  comments: IComment[] = [];
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.comments = this.application.msg?.map(item => item);

    this.commentForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  onSubmit(applicationId: string) {
    if (this.commentForm.valid && this.commentForm.value) {
      const message = this.commentForm.value;
      this.commentService
        .createComment(applicationId, message)
        .subscribe(value => {
          this.application = value;
          this.manager = value.manager;
          this.updateComments();
          this.comments = this.application.msg?.map(item => item);
        });
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

  updateComments() {
    this.managerUpdated.emit(this.manager);
  }
}
