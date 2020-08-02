import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import Swal from 'sweetalert2';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/export-data/export-data.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  editarCategoria: boolean = false;
  insertarCategoria: boolean = true;

  categorias: any;
  idCategoria: string;
  searchText: string;
  pageActual: number = 1;
  arraCategorias = [];
  arraNewCategorias = [];
  title: string;
  cargando: boolean;

  constructor(private categoriaService: CategoriaService, private _PdfService: PdfServiceService, private excelService: ExportDataService) {
    this.title = "Reporte de Categorias";
    this.cargando = false;

  }


  ngOnInit(): void {
    this.obtenerCategorias();
    this.arraCategorias = [];
  }

  obtenerCategorias() {
    this.cargando = true;
    this.categoriaService.obtenerCategorias().then((categorias: any) => {
      this.cargando = false;
      this.categorias = categorias.cont;

      for (const categoria of this.categorias) {

        let element = [
          categoria.strNombre.replace(/\:null/gi, ':""'),
          categoria.strDescripcion,
          categoria.blnActivo ? 'Sí' : 'No'

        ];

        this.arraCategorias.push(element);
        this.arraNewCategorias = this.arraCategorias;
      }

    }).catch((err: any) => {
      this.cargando = false;
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      this.categorias = [];
    });
  }

  eliminarCategoria(id: string) {
    this.categoriaService.desactivarCategoria(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡La categoria " ${nombre} " se desactivo correctamente!`
      });
      this.obtenerCategorias();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }

  activarCategoria(id: string) {
    this.categoriaService.activarCategoria(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡La categoria " ${nombre} " se activo correctamente!`
      });
      this.obtenerCategorias();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }

  mostrarActualizar(idCategoria: string) {
    this.idCategoria = idCategoria;
    this.editarCategoria = true;
    this.insertarCategoria = false;
  }

  terminarActualizacion(event) {
    this.ngOnInit();
    this.editarCategoria = false;
    this.insertarCategoria = true;
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
      "Reporte de categorias",
      header,
      this.arraNewCategorias,
      "center"
    );
  }

  exportAsXLSX() {
    let jsnInfo = {};
    const jsnObject = [];

    if (this.categorias.length !== 0) {

      for (let datos of this.categorias) {
        jsnInfo = {};
        jsnInfo = {
          'Nombre': datos.strNombre,
          'Descripcion': datos.strDescripcion,
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

