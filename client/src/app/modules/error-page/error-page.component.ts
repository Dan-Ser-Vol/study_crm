import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services';
@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent implements OnInit {
  errorStatus: string;

  constructor(
    private route: ActivatedRoute,
    private navigator: NavigationService
  ) {}

  ngOnInit(): void {
    this.errorStatus = this.route.snapshot.queryParams['errorStatus'];
  }

  goBack(): void {
    this.navigator.back();
  }
}
