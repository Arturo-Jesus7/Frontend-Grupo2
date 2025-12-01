import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { roleslistar } from './roleslistar/roleslistar';

@Component({
  selector: 'app-roles',
  imports: [RouterOutlet,roleslistar],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {
  constructor(public route:ActivatedRoute){}
}
