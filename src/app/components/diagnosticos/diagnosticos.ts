import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Diagnosticoslistar } from './diagnosticoslistar/diagnosticoslistar';

@Component({
  selector: 'app-diagnosticos',
  imports: [RouterOutlet,Diagnosticoslistar],
  templateUrl: './diagnosticos.html',
  styleUrl: './diagnosticos.css',
})
export class Diagnosticos {
constructor(public route:ActivatedRoute){}

}
