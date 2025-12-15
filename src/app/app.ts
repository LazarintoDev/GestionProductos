import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

/* Importar el modelo y el service */
import { ProductService} from './services/productService';
import { Producto } from '../models/model.producto';

/* Componentes se importan aqui para usarlos en el html del componente */
import { ProductsListComponent,  } from './components/products-list/products-list';
import { ProductFormComponent } from './components/product-form/product-form';

/* import { RouterOutlet } from '@angular/router'; */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductsListComponent, ProductFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestionProductos');

  constructor (private productService: ProductService){
    this.productService.cargarProductos().subscribe(
      (datos: Producto[])=>console.log('Productos cargados de la API', datos)
    )
/*   si quieres meter más sentencias en ⬆️ añade corchetes y separalas con ;

    .subscribe({
      (datos: Product[])=>console.log('Productos cargados de la API', datos);
      ...otra sentencia;
      ...otra sentencia
      }
    )  */
  }
  

  onProductoCreado(producto: Producto){
    this.productService.agregarProducto(producto)
    console.log('Producto cargado correctamente', producto)
  }
}
