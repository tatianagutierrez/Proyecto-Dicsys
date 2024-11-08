import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public globalText: GlobalText,
    public urlNavigateService: UrlNavigateService
  ) {}

  navegarHome() {
    this.urlNavigateService.navegarURL('/home')
  }
}
