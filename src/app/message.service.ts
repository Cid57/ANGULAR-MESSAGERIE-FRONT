import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://angular-messagerie';
  constructor(private http: HttpClient) {}

  getMessages(conversationId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/read_messages.php?conversation_id=${conversationId}`
    );
  }

  sendMessage(content: string, conversationId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      content: content,
      conversation_id: conversationId,
    };
    return this.http.post(`${this.apiUrl}/create_message.php`, body, {
      headers: headers,
    });
  }
}
