import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import Swal from 'sweetalert2';
import { CategoriaModel } from 'src/app/models/categoria';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  editarCategoria = true;
  registrarCategoria = false;
  idCat: string;

  @Input() set idCategoria(value) {
    this.idCat = value;
    this.ngOnInit();
  }

  @Output() terminarActualizacion = new EventEmitter();

  categoria: CategoriaModel = new CategoriaModel();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obtenerpaisid();
  }

  obtenerpaisid() {
    this.categoriaService.obtenerCategoriaid(this.idCat).then((resp: any) => {
      this.categoria = resp.cont[0];
      console.log(this.categoria);
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }

  actualizar() {
    this.categoriaService.actualizarCategoria(this.idCat, this.categoria).then((resp: any) => {

      Toast.fire({
        icon: 'success',
        title: `¡El país "${this.categoria.strNombre}" fue actualizado correctamente!`
      });
      this.terminarActualizacion.emit();

    }).catch((err: any) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      this.terminarActualizacion.emit();
    });

  }

  cancelar() {
    this.terminarActualizacion.emit();
  }

}
