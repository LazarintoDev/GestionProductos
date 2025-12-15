import { Component, Input} from '@angular/core';
import { Producto } from '../../../models/model.producto'; 
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
/* 
  todo lo que me venga del input, lo almaceno en "producto", si no es null "!" 
  productCard se lo pasaremos a la llamada en el hijo (product-list.html) como atributo de <app-product-card>
  index igual a productCard, para indicar el numero de iteración del for del product-list.html
*/
  @Input() productCard!: Producto;
  @Input() index!: Number;

  constructor (private productService: ProductService){

  }

  eliminarProducto(){
    this.productService.eliminarProducto(this.productCard._id)
  }

}
