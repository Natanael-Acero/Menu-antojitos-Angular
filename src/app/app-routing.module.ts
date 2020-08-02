import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { PlatilloComponent } from './components/platillo/platillo.component';


const routes: Routes = [
  { path: '', component: CategoriaComponent },
  { path: 'platillo/:idCategoria', component: PlatilloComponent }
];


export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
