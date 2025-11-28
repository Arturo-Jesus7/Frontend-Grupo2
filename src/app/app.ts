import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './components/menu/menu';
import { Loginservice } from './services/loginservice';

@Component({
  selector: 'app-root',
  imports: [Menu, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FrontEndGrupo2');
  isLoggedIn = false;

  constructor(private loginService: Loginservice) {}

  ngOnInit() {
    this.isLoggedIn = this.loginService.verificar();
    // Opcional: escuchar cambios si implementas un Subject en el servicio
  }
}
