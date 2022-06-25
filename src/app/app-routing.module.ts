import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearOrdenComponent } from './pages/crear-orden/crear-orden.component';
import { HomeComponent } from './pages/home/home.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LoginComponent } from './pages/login/login.component';
import { NegocioComponent } from './pages/negocio/negocio.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "negocio", component: NegocioComponent },
  { path: "crear-orden", component: CrearOrdenComponent },
  { path: "reporte-orden", component: ReportesComponent },
  { path: "productos", component: ProductoComponent },
  { path: "inventario", component: InventarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
