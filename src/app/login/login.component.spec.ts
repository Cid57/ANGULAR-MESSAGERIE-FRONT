import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AuthentificationService } from '../authentification.sercice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthentificationService
  ) {
    this.formulaire = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onConnexion(): void {
    if (this.formulaire.valid) {
      this.http
        .post(
          'http://localhost/path-to-your-backend/login.php',
          this.formulaire.value
        )
        .subscribe(
          (response: any) => {
            if (response && response.jwt) {
              this.authService.connexion(response.jwt);
              this.router.navigate(['/accueil']);
            } else {
              console.error('Login failed');
            }
          },
          (error) => {
            console.error('Login error', error);
          }
        );
    }
  }
}
