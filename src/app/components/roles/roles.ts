import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Roleslistar } from './roleslistar/roleslistar';

@Component({
  selector: 'app-roles',
  imports: [RouterOutlet,Roleslistar],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {
  constructor(public route:ActivatedRoute){}
}
