import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  public nombre
  public apellido
  productos: any

  constructor(
    public globalText: GlobalText, 
    public router: Router,
    public productosService: ProductosService
  ) {

    const navigability = this.router.getCurrentNavigation()

    if (navigability && navigability.extras && navigability.extras.state) {
      const data = navigability.extras.state
      this.nombre = data['nombre'];
      this.apellido = data['apellido']
    }

    // TODO: ID dinamico
    this.productosService.getProductosByCategoria(1).subscribe(result => {
      this.productos = result
    })

  }

}