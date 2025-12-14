import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* Modelo de datos */
export interface Product{
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = "https://api.npoint.io/1dee63ad8437c82b24fe"  /* e */

/* Inyección de depencias HttpClient a la variable http */
  constructor(private http: HttpClient){}

/* Observable<Producto[]>
    Indica que el metodo recibira una lista "Producto[]""
    cuando la API responda "Observable", es decir, de manera asincrona #buena practica)
    Sino, se debe indicar en el tipo en component-> .suscribe( (datos: Product[])=>{...} ) #peor practica pero legible
*/
  cargarProductos(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url)
  }
}
