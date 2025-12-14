import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Product, ProductService} from './services/product';
import { ProductsList } from './components/products-list/products-list';
/* import { RouterOutlet } from '@angular/router'; */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductsList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestionProductos');

  constructor (private productService: ProductService){
    this.productService.cargarProductos().subscribe(
      (datos: Product[])=>console.log('Productos cargados de la API', datos)
    )
/*   si quieres meter más sentencias en ⬆️ añade corchetes y separalas con ;

    .subscribe({
      (datos: Product[])=>console.log('Productos cargados de la API', datos);
      ...otra sentencia;
      ...otra sentencia
      }
    )  */

  }
}
