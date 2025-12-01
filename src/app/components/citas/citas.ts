import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Citaslistar } from './citaslistar/citaslistar';

@Component({
  selector: 'app-citas',
  imports: [RouterOutlet,Citaslistar],
  templateUrl: './citas.html',
  styleUrl: './citas.css',
})
export class Citas {
constructor(public route:ActivatedRoute){}

}
