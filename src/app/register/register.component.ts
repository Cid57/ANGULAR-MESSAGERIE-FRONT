import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formulaire = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    if (this.formulaire.valid) {
      if (
        this.formulaire.value.password !== this.formulaire.value.confirmPassword
      ) {
        console.error('Passwords do not match');
        return;
      }

      this.http
        .post(
          'http://localhost/path-to-your-backend/add-user.php',
          this.formulaire.value
        )
        .subscribe(
          (response: any) => {
            if (
              response &&
              response.message === "L'utilisateur a bien été ajouté"
            ) {
              this.router.navigate(['/connexion']);
            } else {
              console.error('Registration failed');
            }
          },
          (error) => {
            console.error('Registration error', error);
          }
        );
    }
  }
}
