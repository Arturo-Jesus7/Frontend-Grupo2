import { Component, OnInit } from '@angular/core';
import { JwtRequest } from '../../models/jwtRequest';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Loginservice} from '../../services/loginservice';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login  implements OnInit {
  constructor(
    private Loginservice: Loginservice,
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
    this.Loginservice.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['usuarios']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
}