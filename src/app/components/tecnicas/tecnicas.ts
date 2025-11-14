import { Component } from '@angular/core';
import { Tecnicaslistar } from './tecnicaslistar/tecnicaslistar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tecnicas',
  imports: [RouterOutlet,Tecnicaslistar],
  templateUrl: './tecnicas.html',
  styleUrl: './tecnicas.css',
})
export class Tecnicas {
constructor(public route:ActivatedRoute){}

}
