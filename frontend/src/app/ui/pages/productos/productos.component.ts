import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  public nombre
  public apellido

  constructor(public globalText: GlobalText, public router: Router) {

    const navegabilidad = this.router.getCurrentNavigation()

    if (navegabilidad && navegabilidad.extras && navegabilidad.extras.state) {
      const data = navegabilidad.extras.state
      this.nombre = data['nombre'];
      this.apellido = data['apellido']
    }
  }

}
