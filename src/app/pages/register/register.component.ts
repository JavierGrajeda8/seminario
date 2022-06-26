import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validMail = false;

  mail = '';
  password = '';

  mensajeError = '';

  regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
  }

  validateMail(evt: any) {
    this.validMail = this.regexp.test(this.mail);
  }

  register() {
    this.authService
      .registerWithEmail(this.mail, this.password)
      .then((response) => {
        this.mensajeError = '';
        this.goto('');
      })
      .catch((error) => {
        console.log(error.code);
        if ((error.code = 'auth/email-already-in-use')) {
          this.mensajeError =
            'Este correo electrónico ya se encuentra registro en el sistema';
        }
      });
  }

  goto(route: string) {
    this.router.navigate([route]);
  }
}
