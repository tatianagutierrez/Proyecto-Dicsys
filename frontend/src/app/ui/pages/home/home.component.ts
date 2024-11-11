import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';
import { HeaderComponent } from '../../components/header/header.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GlobalUrl } from '../../../data/util';
import { NgFor } from '@angular/common';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SliderComponent, FooterComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categorias: any
  imagenDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQunrIhOSUUk2Qko66dLjww5zyenkkguPB_XA&s'

  constructor(
    public globalText: GlobalText,
    public urlNavigateService: UrlNavigateService,
    public globalUrl: GlobalUrl,
    public categoriasService: CategoriasService
  ) {
    this.categoriasService.getCategorias().subscribe(result => {
      this.categorias = result;
    })  
  }

  navigateProducts(categoria: any) {
    this.urlNavigateService.navigateUrlData(this.globalUrl.products, {
      state: {
        category: categoria,
      }
    })
  }
}
