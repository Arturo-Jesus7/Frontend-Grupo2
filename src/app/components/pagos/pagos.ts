import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Pagoslistar } from './pagoslistar/pagoslistar';

@Component({
  selector: 'app-pagos',
  imports: [RouterOutlet,Pagoslistar],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css',
})
export class Pagos {
constructor(public route:ActivatedRoute){}

}
