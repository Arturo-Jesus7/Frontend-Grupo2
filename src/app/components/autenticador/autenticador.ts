import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/select';
import { Loginservice } from '../../services/loginservice';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { JwtRequest} from '../../models/jwtRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-autenticador',
  imports: [CommonModule,FormsModule,MatInputModule,MatButtonModule,RouterModule],
  templateUrl: './autenticador.html',
  styleUrl: './autenticador.css',
})
export class Autenticador implements OnInit {

    showLogin = false;
  showRegister = false;
  
    constructor(
    private loginService: Loginservice,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';

  ngOnInit(): void {}
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
      this.router.navigate(['/app/menu']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
  closeAuth(): void {
    this.showLogin = false;
    this.showRegister = false;
  }
}