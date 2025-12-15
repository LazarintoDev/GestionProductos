import { Component } from '@angular/core';
import { Product, ProductService } from '../../services/product';
/* te traes el ProductCard */
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCard], /* no olvides aqui */
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {

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
