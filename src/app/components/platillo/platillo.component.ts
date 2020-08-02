import { Component, OnInit, Input } from '@angular/core';
import { PlatilloService } from 'src/app/services/platillo/platillo.service';
import Swal from 'sweetalert2';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/export-data/export-data.service';
import { Router, ActivatedRoute } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css']
})
export class PlatilloComponent implements OnInit {

  editarPlatillo: boolean = false;
  insertarPlatillo: boolean = true;
  platillos: any;
  idPlatillo: string;
  searchText: string;
  pageActual: number = 1;
  arraPlatillos = [];
  arraNewPlatillos = [];
  title: string;
  cargando: boolean
  @Input() idCategoria: any;

  constructor(private platilloService: PlatilloService, private _PdfService: PdfServiceService, private excelService: ExportDataService, private router: Router,
    private activatedRouter: ActivatedRoute) {

    this.title = "Reporte de platillos";
    this.cargando = false;
    this.idCategoria = activatedRouter.snapshot.params.idCategoria;
  }


  ngOnInit(): void {
    this.obtenerPlatillos();
    this.arraPlatillos = [];
  }

  obtenerPlatillos() {
    this.cargando = true;
    this.platilloService.obtenerPlatillosidCategoria(this.idCategoria).then((platillos: any) => {
      this.cargando = false;
      this.platillos = platillos.cont;

      for (const platillo of this.platillos) {

        let element = [
          platillo.strNombre.replace(/\:null/gi, ':""'),
          platillo.strDescripcion,
          platillo.strIngredientes,
          platillo.nmbPiezas,
          platillo.nmbPrecio,
          platillo.blnActivo ? 'Sí' : 'No'

        ];

        this.arraPlatillos.push(element);
        this.arraNewPlatillos = this.arraPlatillos;
      }

    }).catch((err: any) => {
      this.cargando = false;
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      this.platillos = [];
    });
  }

  eliminarPlatillo(id: string) {
    this.platilloService.desactivarPlatillo(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡El platillo " ${nombre} " se desactivo correctamente!`
      });
      this.obtenerPlatillos();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }

  activarPlatillo(id: string) {
    this.platilloService.activarPlatillo(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡El platillo " ${nombre} " se activo correctamente!`
      });
      this.obtenerPlatillos();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }

  mostrarActualizar(idPlatillo: string) {
    this.idPlatillo = idPlatillo;
    this.editarPlatillo = true;
    this.insertarPlatillo = false;
  }

  terminarActualizacion(event) {
    this.ngOnInit();
    this.editarPlatillo = false;
    this.insertarPlatillo = true;
  }

  exportPDF() {
    let header = [
      {
        text: "Nombre",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Descripción",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Ingredientes",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Piezas",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Precio",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "  Activo  ",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }

    ];
    this._PdfService.generatePdf(
      "Reporte de platillos",
      header,
      this.arraNewPlatillos,
      "center"
    );
  }

  exportAsXLSX() {
    let jsnInfo = {};
    const jsnObject = [];

    if (this.platillos.length !== 0) {

      for (let datos of this.platillos) {
        jsnInfo = {};
        jsnInfo = {
          'Nombre': datos.strNombre,
          'Descripcion': datos.strDescripcion,
          'Ingredientes': datos.strIngredientes,
          'Piezas': datos.nmbPiezas,
          'Precio': datos.nmbPrecio,
          'Activo': datos.blnActivo ? 'Si' : 'No'
        };
        if (jsnInfo !== '') {
          jsnObject.push(jsnInfo);
        }
      }
      this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
    }
  }

}
