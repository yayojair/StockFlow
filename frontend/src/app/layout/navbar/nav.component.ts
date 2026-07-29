import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // <- Crucial importar esto
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavbarComponent { }