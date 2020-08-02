import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlatilloService } from '../../../services/platillo/platillo.service';
import { PlatilloModel } from 'src/app/models/platillo';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-insertar-platillo',
  templateUrl: './insertar-platillo.component.html',
  styleUrls: ['./insertar-platillo.component.css']
})
export class InsertarPlatilloComponent implements OnInit {

  @Output() terminarActualizacion = new EventEmitter();

  @Input() idCategoria;

  forma: NgForm;
  platillo: PlatilloModel = new PlatilloModel();

  constructor(private platilloService: PlatilloService) { }

  ngOnInit(): void {
  }

  registrarPlatillo(forma: NgForm) {
    this.platilloService.registrarPlatillo(this.idCategoria, this.platillo).then((resp: any) => {

      this.terminarActualizacion.emit();

      Toast.fire({
        icon: 'success',
        title: `¡El platillo "${this.platillo.strNombre}" fue agregado correctamente!`
      });

      forma.controls['strNombre'].reset();
      forma.controls['strDescripcion'].reset();
      forma.controls['strIngredientes'].reset();
      forma.controls['nmbPiezas'].reset();
      forma.controls['nmbPrecio'].reset();

    }).catch((err) => {

      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });

    });
  }

}
