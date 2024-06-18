import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService],
    });
    service = TestBed.inject(MessageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch messages', () => {
    const dummyMessages = { records: [{ id: 1, content: 'Hello' }] };

    service.getMessages(1).subscribe((messages) => {
      expect(messages.records.length).toBe(1);
      expect(messages.records).toEqual(dummyMessages.records);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/read_messages.php?conversation_id=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyMessages);
  });

  it('should send a message', () => {
    const dummyResponse = { message: 'Message was created.' };

    service.sendMessage('Hello', 1).subscribe((response) => {
      expect(response.message).toBe('Message was created.');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/create_message.php`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
});
