import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
/* importas el Producto modelo */
import { Producto } from '../../models/model.producto';
/* BehaviorSubject es una mini base datos en memoria (ram) */
import { BehaviorSubject } from 'rxjs';



/* ESTA CLASE ES LA QUE INTERACTÚA CON LA BBDD */
@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private urlApi = "https://api.npoint.io/1dee63ad8437c82b24fe"  /* e */
  private productSubject = new BehaviorSubject<Producto[]>([])


/* el $ al final de la variable, es una convencion para indicar que es un flujo de datos, 
  que es Observable, tienes que usar subscribe o async -> es reactivo 
  enviara los cambios a los componentes, **ES LA QUE SE USA EN LO COMPONENTES** (solo lectura)
*/
  productos$ = this.productSubject.asObservable()

/* variable modelo de Producto, para elaborar listas */
  private productosOriginales: Producto[] = [];

/* variables para el ProductFilterComponent */
  private filtroNombre = ''
  private filtroCategoria = ''
  private filtroPrecio = 0
  private filtroActivos = false




/* Inyección de depencias HttpClient a la variable http */
  constructor(private httpClient: HttpClient){}

/* Observable<Producto[]>
    Indica que el metodo recibira una lista "Producto[]""
    cuando la API responda "Observable", es decir, de manera asincrona #buena practica)
    Sino, se debe indicar en el tipo en component-> .suscribe( (datos: Producto[])=>{...} ) #peor practica pero legible

    Explicacion del metodo paso a paso: 
      a) this.http.get<Produco[]>(this.url) -> busca productos en la API
      b) .pipe() -> tubo por donde pasa el flujo datos, y que perimite acciontes: 
        tap -> mirar y dejalos seguir sin tocar
        filter -> deja pasar solo algunos
        map -> quita cosas o cambia datos
        catch -> capturar errores
      c) tap(productos => { ... }) -> Cuando lleguen los productos haces => 
      d) this.productosOriginales = productos -> guarda copia de seguridad
      e) this.productosSubject.next(productos) -> Aviso a componetes que tiene los productos
      f) catchError(...) -> si algo va mal
    */
  cargarProductos(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.urlApi).pipe(
      tap((listaProductos: Producto[]) =>{
        this.productosOriginales = listaProductos //hacer la copia de la lista
        this.productSubject.next(listaProductos)
      }),
      catchError(err => {
        console.log('Algo salio mal con productos: ', err)
        throw err
      })
    )
  }

/* 
fontend no debe rercibir datos que el mismo genera, el id en el formulario no se pasa
se genera con randomUUID() 
*/
    agregarProducto(datos: Omit<Producto, 'id'>) { /* evitar la anulacion de restriccion de tipos con any */

     const nuevoProducto: Producto = {
      _id: crypto.randomUUID(),   // Generamos un ID único (trampilla)
      name: datos.name,
      description: datos.description,
      price: datos.price,
      category: datos.category,
      image: datos.image,
      active: datos.active
    };

/*
const porque da mas consistencia a los datos, como escribir en papel nuevo en lugar de tachar y borrar el existen

el patron ...this se llama "spread operator" y crea un nuevo array no actualiza existente
mete el nuevProducto el indice 0 el resto lo rellena con la lista this.productosOriginales[] 
Angular detecta mejor un nuevo array
*/
  const nuevaLista = [nuevoProducto, ...this.productosOriginales];

  // Añadimos el nuevo producto al principio de la lista
  this.productosOriginales = nuevaLista;

  // Emitimos la nueva lista para que Angular actualice la vista
  this.productSubject.next(nuevaLista);

/* como lo propone damian
    this.productosOriginales = [nuevoProducto, ...this.productosOriginales];
    this.productSubject.next(this.productosOriginales); */
  }

  eliminarProducto(id: string): void {
/* 
por consistencia, mejor un papel nuevo que tachar el existente
.filter recorre la lista y se queda con todos no sean igual al id, quita el que tenga el id
*/
  const nuevaLista = this.productosOriginales.filter(p => p._id !== id); //nuevaLista no contiene el que tiene el id

  this.productosOriginales = nuevaLista;

  this.productSubject.next(nuevaLista); //actualiza la lista
}

/* metodos para el ProductFilterComponent */
private aplicarFiltros(): void {
  let lista = [...this.productosOriginales]

  if (this.filtroNombre){ //entra si filtroNombre tiene algo
    lista = lista.filter(p => //filter recorre la lista p tiene la forma de Producto[]
      p.name.toUpperCase().includes(this.filtroNombre.toUpperCase()) //includes busca coincidencias (igual que like de sql)
    )
  }

  if (this.filtroCategoria){
    lista = lista.filter(p =>
      p.category.toUpperCase().includes(this.filtroCategoria.toUpperCase())
    )
  }
  
  if (this.filtroActivos){
    lista = lista.filter(p => p.active)//dame los que son activos
  }

  if (this.filtroPrecio > 0){
    lista = lista.filter(p =>
      p.price < this.filtroPrecio
    )
  }


  this.productSubject.next(lista)//actualiza la lista
}

/*Setter de filtros, estos son invocados por los hadlers */
  filtrarPorNombreService(nombre: string): void {
    this.filtroNombre = nombre;
    this.aplicarFiltros();
  }

  filtrarPorCategoriaService(categoria: string): void {
    this.filtroCategoria = categoria;
    this.aplicarFiltros();
  }

  filtrarPorPrecioService(precio: number): void {
    this.filtroPrecio = precio;
    this.aplicarFiltros();
  }



  filtrarSoloActivosService(activo: boolean): void {
    this.filtroActivos = activo;
    this.aplicarFiltros();
  }

  
}
