import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: any = {}; 

  constructor(
    private loginService: LoginService, 
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  login() {
    //console.log('Enviar datos', this.credentials);
    this.loginService.login({email: this.credentials.username, password: this.credentials.password}).
    subscribe( {
      complete:()=>{
        this.router.navigate(['/login-success']);
      },
      error:(err)=> {
        console.log(err)
      }
      
    })
  }


}
