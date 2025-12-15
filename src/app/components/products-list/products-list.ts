import { Component } from '@angular/core';

/* Importar el modelo y el service */
import { ProductService } from '../../services/productService';
import { Producto } from '../../../models/model.producto'; 

/* Importar los componetes vayan a ser usados en el html */
import { ProductCardComponent } from '../product-card/product-card';
import { Observable } from 'rxjs';

/* se usa en el @for en sustitucion de suscribe */
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, AsyncPipe], /* 👈 importar componentes aqui */
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})

export class ProductsListComponent {

  /*  Almecena la lista de productos */
  productos: Producto[] = []
  /*  Activa la clase fade-slide-in-list en el product-list.html */
  animarLista = false


/*   constructor(private productService: ProductService) {
    this.productService.cargarProductos().subscribe(
      //no tipar datos si en service se declara -> cargarProductos():Observable<Product[]>
      (datos) => {
        setTimeout(() => {
          this.productos = datos
          this.animarLista = true //da comienzo la animacion de las tarjetas-tabla
          console.log('Productos cargados de la API', datos)
        }, 800)

      }
    )
  } 
  
  */

/*   
  ahora el componente no llama a cargarProductos() ⬆️
  el service con produtos$ le pasa la lista en cargarProductos()
*/
  productos$: Observable<Producto[]>; //variable local para guardar productService.procutos$

/* inyección del service */
  constructor(private productService: ProductService) {
    this.productos$ = this.productService.productos$;
  }

/* inyeccion de damian, patron obsoleto, menos consistente. Lo deja vacio

    constructor(private productService: ProductService) {
    //this.productService.productos$.subscribe(productos => {
    //this.productos = productos;
    //  console.log('Productos recibidos:', productos);
    //});
  } 

*/

}
