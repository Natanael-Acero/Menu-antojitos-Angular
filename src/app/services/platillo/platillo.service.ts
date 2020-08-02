import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatilloModel } from '../../models/platillo';

@Injectable({
    providedIn: 'root'
})
export class PlatilloService {

    url = 'http://localhost:3000/api/platillo';

    constructor(private http: HttpClient) { }

    obtenerPlatilloidPlatillo(idPlatillo: String) {
        return this.http.get(`${this.url}/obtener/${idPlatillo}`).toPromise();
    }

    obtenerPlatillosidCategoria(idCategoria: String) {
        return this.http.get(`${this.url}/obtener/${idCategoria}`).toPromise();
    }

    registrarPlatillo(idCategoria: String, platillo: PlatilloModel) {
        return this.http.post(`${this.url}/registrar/${idCategoria}`, platillo).toPromise();
    }

    actualizarPlatillo(idPlatillo: String, platillo: PlatilloModel) {
        return this.http.put(`${this.url}/modificar/${idPlatillo}`, platillo).toPromise();
    }
    desactivarPlatillo(idPlatillo: string) {
        return this.http.delete(`${this.url}/eliminar/${idPlatillo}`, {}).toPromise();
    }
    activarPlatillo(idPlatillo: String) {
        return this.http.delete(`${this.url}/activar/${idPlatillo}`).toPromise();

    }
}