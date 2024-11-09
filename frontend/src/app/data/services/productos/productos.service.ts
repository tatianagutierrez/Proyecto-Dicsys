import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = 'http://localhost:4000/api/productos'

  constructor(private http:HttpClient) { }

  // TODO: HACER ANDAR
  public getProductosByCategoria(categoriaId: number){
    return this.http.get(this.url + categoriaId)
  }
}
