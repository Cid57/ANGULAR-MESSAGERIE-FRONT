import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
  conversations: any[] = [];
  private apiUrl = 'http://angular-messagerie';

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    const userId = 10;
    this.http
      .get<any>(`${this.apiUrl}/conversations.php?user_id=${userId}`)
      .subscribe(
        (data) => {
          if (data && data.records) {
            this.conversations = data.records;
          } else {
            this.conversations = [];
          }
        },
        (error) => {
          console.error('Erreur lors du chargement des conversations', error);
          this.conversations = [];
        }
      );
  }

  selectConversation(conversationId: number): void {
    this.router.navigate(['/discussions', conversationId]);
  }
}
