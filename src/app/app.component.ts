import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authentification: AuthentificationService = inject(AuthentificationService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.authentification.getInfoFromJwtLocalStorage();
  }

  onDeconnexion(): void {
    this.authentification.deconnexion();
    this.router.navigate(['/accueil']);
  }
}
