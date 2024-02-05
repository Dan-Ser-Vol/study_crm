import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsService } from '../../../../services';
import { IApplication } from '../../../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
  @Input()
  element: IApplication;
  messages: string[] = [];
  messageForm: FormGroup;

  constructor(private appService: ApplicationsService) {}

  ngOnInit() {
    this.messages = this.element.msg.map(item => item);
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  onSubmit(id: string) {
    if (this.messageForm.valid && this.messageForm.value) {
      const msg = this.messageForm.value;
      this.messages.unshift(msg.message);
      console.log(msg.message);
      this.appService.createMessage(id, msg).subscribe();
      this.messageForm.reset();
    }
    return;
  }
}
