import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';
import { GlobalText } from '../../../data/text';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { GlobalUrl } from '../../../data/util';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, ReactiveFormsModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  productoForm: FormGroup;
  categorias: any[] = []; 
  selectedFile: File | null = null;

  constructor(
    public globalText: GlobalText, 
    private fb: FormBuilder, 
    private http: HttpClient, 
    public productosService: ProductosService,
    public categoriasService: CategoriasService,
    public urlNavigateService: UrlNavigateService,
    public globalUrl: GlobalUrl
  ) 
  {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      id_categoria: ['', Validators.required],
      ruta_imagen: [null]
    });
  }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(result => {
      this.categorias = result;
    }) 
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.productoForm.value.nombre);
    formData.append('descripcion', this.productoForm.value.descripcion);
    formData.append('fecha_vencimiento', this.productoForm.value.fecha_vencimiento);
    formData.append('precio', this.productoForm.value.precio);
    formData.append('stock', this.productoForm.value.stock);
    formData.append('id_categoria', this.productoForm.value.id_categoria);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productosService.createProduct(formData).subscribe(response => {
      console.log('Producto creado con éxito', response);
      this.urlNavigateService.navigateURL(this.globalUrl.home)
    }, error => {
      console.error('Error al crear el producto', error);
    });
  }
}
