import { Component } from '@angular/core';
import { Product, ProductService } from '../../services/product';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {

  /*   Variable para almacenar la lista de productos */
  productos: Product[] = []
  animarTabla = false

  constructor(private productService: ProductService) {
    this.productService.cargarProductos().subscribe(
      /* no tipar datos si en service se declara -> cargarProductos():Observable<Product[]> */
      (datos) => {
        setTimeout(() => {
          this.productos = datos
          this.animarTabla = true /* da comienzo la animacion de la tabla */
          console.log('Productos cargados de la API', datos)
        }, 800)

      }
    )
  }

}
