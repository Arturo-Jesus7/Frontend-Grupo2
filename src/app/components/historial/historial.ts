import { Component } from '@angular/core';
import { Historiallistar } from './historiallistar/historiallistar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-historial',
  imports: [RouterOutlet,Historiallistar],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial {
constructor(public route:ActivatedRoute){}

}
