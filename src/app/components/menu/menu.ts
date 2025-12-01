import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-menu',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  role: any = '';
  usuario: string = '';

  constructor(private loginService: Loginservice) {}

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    console.log('ROL CARGADO (MenuComponent):', this.role);
  }

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  /** ---------------------------------------
   *     FUNCIÓN CENTRAL PARA VALIDAR ROL
   *  --------------------------------------- */
  private hasRole(roleName: string): boolean {
    if (!this.role) return false;

    const expected = roleName.toUpperCase();

    // Caso 1: Array → ['ADMIN']
    if (Array.isArray(this.role)) {
      return this.role.some((r: string) => r.toUpperCase() === expected);
    }

    // Caso 2: String → 'ADMIN'
    if (typeof this.role === 'string') {
      return this.role.toUpperCase() === expected;
    }

    return false;
  }

  /** ---------------------------------------
   *              VALIDADORES
   *  --------------------------------------- */
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isPaciente(): boolean {
    return this.hasRole('PACIENTE');
  }

  isTerapeuta(): boolean {
    return this.hasRole('TERAPEUTA');
  }
}