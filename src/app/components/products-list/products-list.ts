import { Component } from '@angular/core';

/* Importar el modelo y el service */
import { Product, ProductService } from '../../services/product';

/* Importar los componetes vayan a ser usados en el html */
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent], /* no olvides aqui */
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsListComponent {

  /*  Almecena la lista de productos */
  productos: Product[] = []
  /*  Activa la clase fade-slide-in-list en el product-list.html */
  animarLista = false

  constructor(private productService: ProductService) {
    this.productService.cargarProductos().subscribe(
      /* no tipar datos si en service se declara -> cargarProductos():Observable<Product[]> */
      (datos) => {
        setTimeout(() => {
          this.productos = datos
          this.animarLista = true /* da comienzo la animacion de las tarjetas-tabla */
          console.log('Productos cargados de la API', datos)
        }, 800)

      }
    )
  }

}
