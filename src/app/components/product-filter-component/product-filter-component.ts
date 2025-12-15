import { Component } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ProductsListComponent } from '../products-list/products-list';

@Component({
  selector: 'app-product-filter-component',
  standalone: true,
  imports: [],
  templateUrl: './product-filter-component.html',
  styleUrl: './product-filter-component.css',
})
export class ProductFilterComponent {


  constructor (private productService: ProductService){

  }

/* Handlers */
  onNombreChange (nombre: string): void {
    this.productService.filtrarPorNombreService(nombre) //le paso al service el dato para que filtre
  }
  onCategoriaChange (categoria: string): void {
    this.productService.filtrarPorCategoriaService(categoria)
  }

  onPrecioChange (precio: number):void{
    this.productService.filtrarPorPrecioService(precio)
  }

  onActivoChange (activo: boolean): void {
      this.productService.filtrarSoloActivosService(activo)

  }
}
