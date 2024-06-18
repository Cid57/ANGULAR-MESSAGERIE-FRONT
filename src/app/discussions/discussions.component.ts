import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-discussions',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss'],
})
export class DiscussionsComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  conversationId: number | null = null; // Initialiser avec null

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const conversationIdStr = params['conversationId'];
      this.conversationId = conversationIdStr ? +conversationIdStr : null;
      if (this.conversationId !== null) {
        this.loadMessages();
      } else {
        console.error('Invalid conversation ID');
      }
    });
  }

  loadMessages(): void {
    if (this.conversationId !== null) {
      this.messageService.getMessages(this.conversationId).subscribe(
        (data) => {
          if (data && data.records) {
            this.messages = data.records;
          } else {
            this.messages = [];
          }
        },
        (error) => {
          console.error('Erreur lors du chargement des messages', error);
          this.messages = [];
        }
      );
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.conversationId !== null) {
      this.messageService
        .sendMessage(this.newMessage, this.conversationId)
        .subscribe(
          (response) => {
            this.newMessage = '';
            this.loadMessages();
          },
          (error) => {
            console.error("Erreur lors de l'envoi du message", error);
          }
        );
    }
  }
}
