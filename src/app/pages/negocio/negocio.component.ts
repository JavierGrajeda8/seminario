import { Component, OnInit } from '@angular/core';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Negocio } from 'src/app/core/interfaces/Negocio';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss']
})
export class NegocioComponent implements OnInit {

  negocioId = 0;
  name = '';
  descripcion = '';
  razonSocial = ''
  nit = ''
  estado = true;

  mensaje = '';
  mensajeError = '';

  negocios: any;


  constructor(private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.getNegocios();
  }

  getNegocios() {
    this.negocioService.getAll().valueChanges().subscribe((data)=> {
      this.negocios = data as Negocio[];
    });
  }

  clean() {
    this.negocioId = 0;
    this.name = '';
    this.descripcion = '';
    this.razonSocial = ''
    this.nit = ''
    this.estado = true;
    this.mensajeError = '';
    this.mensaje = '';
  }

  edit(negocio: Negocio) {
    this.negocioId = negocio.negocioId;
    this.name = negocio.nombre;
    this.descripcion = negocio.descripcion;
    this.razonSocial = negocio.razonSocial;
    this.nit = negocio.nit;
    this.estado = negocio.estado === ConstStatus.activo ? true : false;
  }

  save() {
    if (this.descripcion.length > 0 && this.razonSocial.length > 0 && this.nit.length > 0 && this.name.length > 0) {
      this.mensajeError = '';
      if (this.negocioId == 0) {
        this.negocioId = Date.now();
      }
      const negocio: Negocio = {
        negocioId: this.negocioId,
        nombre: this.name,
        descripcion: this.descripcion,
        razonSocial: this.razonSocial,
        nit: this.nit,
        estado: this.estado ? ConstStatus.activo : ConstStatus.inactivo,
      }

      this.negocioService.set(negocio).then(() => {
        this.clean();
        this.mensaje = this.name + ' guardado correctamente.'
      })

    } else {
      this.mensaje = '';
      this.mensajeError = 'Por favor completa todos los campos que tengan asterisco (*)';
    }
  }

  cerrarMsj() {
    this.mensaje = '';
  }

  cerrarMsjError() {
    this.mensajeError = '';
  }

}
