import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { CategoriaModel } from 'src/app/models/categoria';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-insertar-categoria',
  templateUrl: './insertar-categoria.component.html',
  styleUrls: ['./insertar-categoria.component.css']
})


export class InsertarCategoriaComponent implements OnInit {

  @Output() terminarActualizacion = new EventEmitter();

  @Input() idCategoria;

  forma: NgForm;
  categoria: CategoriaModel = new CategoriaModel();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  registrarCategoria(forma: NgForm) {
    this.categoriaService.registrarCategoria(this.categoria).then((resp: any) => {

      this.terminarActualizacion.emit();

      Toast.fire({
        icon: 'success',
        title: `¡La categoria "${this.categoria.strNombre}" fue agregado correctamente!`
      });

      forma.controls['strNombre'].reset();
      forma.controls['strDescripcion'].reset();

    }).catch((err) => {

      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });

    });
  }


}
