import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public globalText: GlobalText) {}
}
