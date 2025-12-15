/* 
Elemento padre -> Output
Gestion de eventos (clic) -> EventEmitter
*/
import { Component, Output, EventEmitter } from '@angular/core';

/* 
FormGroup + FormControl + ReactiveFormsModule -> para formularios reactivos, que hacen algo con el evento
*/
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductFormComponent {

/* Emite fuere productoCreado a través de enviar() */
  @Output() productoCreado = new EventEmitter<any>();

/* 
  el formulario contiene los atributos del objeto, este es el modelo
  Angular necesita inicializar los valores
*/
  formGroup = new FormGroup({
    name: new FormControl(''), /* estos valores por defecto aparecen en el formulario de html */
    description: new FormControl(''),
    price: new FormControl(0),
    category: new FormControl(''),
    image: new FormControl(''),
    active: new FormControl(true)
  })

  enviar(){
/*   el emit antes que la asignación por defecto, sino siempre va a enviar la asignacion */
    this.productoCreado.emit(this.formGroup.value);

    this.formGroup.reset({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      active: true,
    })

  }
}
