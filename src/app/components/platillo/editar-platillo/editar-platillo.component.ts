import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatilloService } from '../../../services/platillo/platillo.service';
import { PlatilloModel } from 'src/app/models/platillo';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CategoriaModel } from 'src/app/models/categoria';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-editar-platillo',
  templateUrl: './editar-platillo.component.html',
  styleUrls: ['./editar-platillo.component.css']
})
export class EditarPlatilloComponent implements OnInit {

  editarPlatillo = true;
  registrarPlatillo = false;
  idPlat: string;

  @Input() set idPlatillo(value) {
    this.idPlat = value;
    this.ngOnInit();
  }

  @Output() terminarActualizacion = new EventEmitter();

  platillo: PlatilloModel = new PlatilloModel();

  constructor(private platilloService: PlatilloService) { }

  ngOnInit(): void {
    this.obtenerplatillo();
  }

  obtenerplatillo() {
    this.platilloService.obtenerPlatilloidPlatillo(this.idPlat).then((resp: any) => {
      this.platillo = resp.cont[0];
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }
  cancelar() {
    this.terminarActualizacion.emit();
  }


  actualizar() {
    this.platilloService.actualizarPlatillo(this.idPlat, this.platillo).then((resp: any) => {

      Toast.fire({
        icon: 'success',
        title: `¡El platillo "${this.platillo.strNombre}" fue actualizado correctamente!`
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

}
