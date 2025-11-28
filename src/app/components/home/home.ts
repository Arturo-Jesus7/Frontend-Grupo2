import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Loginservice } from '../../services/loginservice';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterModule, MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule,CommonModule ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
     rol: string = '';
  constructor(
    private router: Router,
    private loginService: Loginservice
  ) {}

verificar() {
    this.rol = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAdmin() {
    return this.rol === 'ADMIN';
  }

  isPsicologo() {
    return this.rol === 'PSICOLOGO';
  }

  isUsuario() {
    return this.rol === 'USUARIO';
  }
}