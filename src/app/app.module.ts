import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { NegocioComponent } from './pages/negocio/negocio.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CrearOrdenComponent } from './pages/crear-orden/crear-orden.component';
import { SeguimientoOrdenComponent } from './pages/seguimiento-orden/seguimiento-orden.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { InventarioComponent } from './pages/inventario/inventario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductoComponent,
    NegocioComponent,
    CrearOrdenComponent,
    SeguimientoOrdenComponent,
    ReportesComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
