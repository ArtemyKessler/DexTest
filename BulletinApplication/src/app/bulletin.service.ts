import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Bulletin } from './bulletin';
import { BULLETINS } from './mock-bulletins';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class BulletinService {
  constructor(private messageService: MessageService) {}

  getBulletins(): Observable<Bulletin[]> {
    this.messageService.add('Объявления загружены');
    return of(BULLETINS);
  }

  getBulletin(id: string): Observable<Bulletin> {
    this.messageService.add(`Загружено объявление id=${id}`);
    return of(BULLETINS.find(bulletin => bulletin.id === id));
  }
}
