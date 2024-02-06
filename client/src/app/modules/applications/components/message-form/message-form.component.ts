import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsService, ManagersService } from '../../../../services';
import { IApplication } from '../../../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '../../../../interfaces/user.interface';

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
  messages: string[] = [];
  manager: IUser | { name: string };
  messageForm: FormGroup;

  constructor(
    private appService: ApplicationsService,
    private managersService: ManagersService
  ) {}

  ngOnInit() {
    this.messages = this.element.msg.map(item => item);
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    if (!this.element.manager) {
      this.manager = { name: 'No manager' };
    } else {
      this.managersService.getById(this.element.manager).subscribe(value => {
        this.manager = value;
      });
    }
  }

  onSubmit(id: string) {
    if (this.messageForm.valid && this.messageForm.value) {
      const msg = this.messageForm.value;
      this.messages.unshift(msg.message);
      this.appService.createMessage(id, msg).subscribe();
      this.messageForm.reset();
    }
    return;
  }
}
