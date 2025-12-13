import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  private url = "https://api.npoint.io/1dee63ad8437c82b24fe"

/* Inyección de depencias HttpClient a la variable http */
  constructor(private http: HttpClient){}

  cargarProductos(){
    return this.http.get<Product[]>(this.url)
  }
}
