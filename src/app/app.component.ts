import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Negocio } from './core/interfaces/Negocio';
import { NegocioService } from './core/services/negocio/negocio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'seminario';
  empresa = 'Giro de negocio';
  negocios: any;
  negocio: any;
  orderby: string = '';
  mensajeError: string = '';

  constructor(
    private negocioService: NegocioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getNegocios();
    this.route.queryParams.subscribe((params: any) => {
      this.negocioService
        .getOne(params.negocioId)
        .valueChanges()
        .subscribe((data) => {
          this.negocio = data as Negocio;
          if (this.negocio) {
            this.empresa = this.negocio.nombre;
          }
        });
    });
  }

  getNegocios() {
    this.negocioService
      .getAllActive()
      .valueChanges()
      .subscribe((data) => {
        this.negocios = data as Negocio[];
      });
  }

  goToRoute(route: string) {
    if (this.negocio) {
      this.mensajeError = '';
      this.router.navigate([route], {
        relativeTo: this.route,
        queryParams: {
          negocioId: this.negocio.negocioId,
        },
        queryParamsHandling: 'merge',
        // preserve the existing query params in the route
        skipLocationChange: false,
        // do not trigger navigation
      });
    } else {
      this.mensajeError = 'Por favor elige un giro de negocio';
    }
  }

  changeRole(negocio: Negocio) {
    this.empresa = negocio.nombre;
    this.negocio = negocio;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        negocioId: negocio.negocioId,
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false,
      // do not trigger navigation
    });
  }
}
