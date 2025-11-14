import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Tratamientoslistar } from './tratamientoslistar/tratamientoslistar';

@Component({
  selector: 'app-tratamientos',
  imports: [RouterOutlet,Tratamientoslistar],
  templateUrl: './tratamientos.html',
  styleUrl: './tratamientos.css',
})
export class Tratamientos {
constructor(public route:ActivatedRoute){}

}
