import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../../models/categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    url = 'http://localhost:3000/api/categoria';

    constructor(private http: HttpClient) { }

    obtenerCategorias() {
        return this.http.get(`${this.url}/obtener`).toPromise();
    }

    obtenerCategoriaid(idCategoria: String) {
        return this.http.get(`${this.url}/obtener/${idCategoria}`).toPromise();
    }

    registrarCategoria(categoria: CategoriaModel) {
        return this.http.post(`${this.url}/registrar`, categoria).toPromise();
    }

    actualizarCategoria(idCategoria: String, categoria: CategoriaModel) {
        return this.http.put(`${this.url}/modificar/${idCategoria}`, categoria).toPromise();
    }
    desactivarCategoria(idCategoria: string) {
        return this.http.delete(`${this.url}/eliminar/${idCategoria}`, {}).toPromise();
    }
    activarCategoria(idCategoria: String) {
        return this.http.delete(`${this.url}/activar/${idCategoria}`).toPromise();

    }
}