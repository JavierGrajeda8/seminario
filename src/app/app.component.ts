import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Negocio } from './core/interfaces/Negocio';
import { AuthService } from './core/services/auth/auth.service';
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
  mail = '';

  constructor(
    private negocioService: NegocioService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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
    this.authService.isLogged().subscribe((data) => {
      console.log('data', data);
      if (data) {
        this.mail = data.email;
      } else {
        this.mail = '';
        this.goto('login');
      }
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

  goto(route: string) {
    this.mensajeError = '';
    this.router.navigate([route]);
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

  logout() {
    this.authService.logOut().then(() => {
      this.goToRoute('login');
    });
  }
}
