import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = 'http://localhost:4000/api/productos/'

  constructor(private http:HttpClient) { }

  public getProductosByCategoria(categoriaId: number){
    return this.http.get(this.url + categoriaId)
  }

  public eliminarProducto(id: number){
    return this.http.delete(this.url + id)
  }

  public createProduct(formData: any){
    return this.http.post(this.url, formData)
  }
}
