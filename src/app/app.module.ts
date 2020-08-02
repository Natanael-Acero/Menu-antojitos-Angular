import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { PlatilloComponent } from './components/platillo/platillo.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { InsertarCategoriaComponent } from './components/categoria/insertar-categoria/insertar-categoria.component';
import { EditarCategoriaComponent } from './components/categoria/editar-categoria/editar-categoria.component';
import { EditarPlatilloComponent } from './components/platillo/editar-platillo/editar-platillo.component';
import { InsertarPlatilloComponent } from './components/platillo/insertar-platillo/insertar-platillo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // 
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    PlatilloComponent,
    NavbarComponent,
    InsertarCategoriaComponent,
    EditarCategoriaComponent,
    EditarPlatilloComponent,
    InsertarPlatilloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
