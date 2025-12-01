import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Sesioneslistar } from './sesioneslistar/sesioneslistar';

@Component({
  selector: 'app-sesiones',
  imports: [RouterOutlet,Sesioneslistar],
  templateUrl: './sesiones.html',
  styleUrl: './sesiones.css',
})
export class Sesiones {
constructor(public route:ActivatedRoute){}

}
