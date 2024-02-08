import { Component, Input, OnInit } from '@angular/core';
import { ApplicationItemComponent } from '../application-item/application-item.component';
import { IApplication } from '../../../../interfaces';
import { AuthService, ManagersService } from '../../../../services';
import { IUser } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [ApplicationItemComponent],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.scss',
})
export class ApplicationsListComponent implements OnInit {
  @Input()
  applications: IApplication[];
  me: IUser;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getMe().subscribe(value => {
      this.me = value;
    });
  }
}
