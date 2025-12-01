import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Videoconferenciaslistar } from './videoconferenciaslistar/videoconferenciaslistar';

@Component({
  selector: 'app-videoconferencias',
  imports: [RouterOutlet,Videoconferenciaslistar],
  templateUrl: './videoconferencias.html',
  styleUrl: './videoconferencias.css',
})
export class Videoconferencias {
  constructor(public route:ActivatedRoute){}

}
