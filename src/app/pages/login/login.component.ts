import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    console.log('login');
    this.activatedRoute.queryParams.subscribe(val => {
      console.log('params', val);
    });
  }

}
