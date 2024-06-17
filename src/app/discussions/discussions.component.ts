import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from '../authentification.sercice';

@Component({
  selector: 'app-discussions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss'],
})
export class DiscussionsComponent {
  messages = [
    { content: 'Bonjour', timestamp: new Date() },
    { content: 'Comment ça va ?', timestamp: new Date() },
  ];
  newMessage: string = '';

  constructor(public authService: AuthentificationService) {}

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ content: this.newMessage, timestamp: new Date() });
      this.newMessage = '';
    }
  }
}
