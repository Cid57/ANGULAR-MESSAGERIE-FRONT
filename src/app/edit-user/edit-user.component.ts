import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  formulaire: FormGroup;
  userId: string | null = null;
  roleList: string[] = ['User', 'Admin']; // Liste des rôles disponibles

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulaire = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      if (this.userId) {
        this.loadUserData(this.userId);
      } else {
        // Clear password validators if in edit mode
        this.formulaire.get('password')?.clearValidators();
        this.formulaire.get('password')?.updateValueAndValidity();
      }
    });
  }

  loadUserData(userId: string): void {
    this.http
      .get(`http://localhost/path-to-your-backend/get-user.php?id=${userId}`)
      .subscribe((user: any) => {
        this.formulaire.patchValue({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        });
        // Remove password validators in edit mode
        this.formulaire.get('password')?.clearValidators();
        this.formulaire.get('password')?.updateValueAndValidity();
      });
  }

  onSubmit(): void {
    if (this.formulaire.valid) {
      if (
        !this.userId &&
        this.formulaire.value.password !== this.formulaire.value.confirmPassword
      ) {
        console.error('Passwords do not match');
        return;
      }

      const formData = this.formulaire.value;
      if (this.userId) {
        // Update user
        this.http
          .put(
            `http://localhost/path-to-your-backend/edit-user.php?id=${this.userId}`,
            formData
          )
          .subscribe(
            (response: any) => {
              this.router.navigate(['/gestion-utilisateurs']);
            },
            (error) => {
              console.error('Error updating user', error);
            }
          );
      } else {
        // Add new user
        this.http
          .post('http://localhost/path-to-your-backend/add-user.php', formData)
          .subscribe(
            (response: any) => {
              this.router.navigate(['/gestion-utilisateurs']);
            },
            (error) => {
              console.error('Error adding user', error);
            }
          );
      }
    }
  }
}
