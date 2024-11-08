import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';
import { HeaderComponent } from '../../components/header/header.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    public globalText: GlobalText,
    public urlNavigateService: UrlNavigateService
  ) {}

  navegarProductos() {
    this.urlNavigateService.navegarUrlDatos('/productos', {
      state: {
        nombre: 'Tatiana',
        apellido: 'Gutierrez'
      }
    })
  }
}
