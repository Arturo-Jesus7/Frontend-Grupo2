import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Terapeutaslistar } from './terapeutaslistar/terapeutaslistar';

@Component({
  selector: 'app-terapeutas',
  imports: [RouterOutlet,Terapeutaslistar],
  templateUrl: './terapeutas.html',
  styleUrl: './terapeutas.css',
})
export class Terapeutas {
constructor(public route:ActivatedRoute){}
}
