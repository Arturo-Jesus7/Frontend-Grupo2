import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Alertaslistar } from './alertaslistar/alertaslistar';

@Component({
  selector: 'app-alertas',
  imports: [RouterOutlet,Alertaslistar],
  templateUrl: './alertas.html',
  styleUrl: './alertas.css',
})
export class Alertas {
constructor(public route:ActivatedRoute){}

}
