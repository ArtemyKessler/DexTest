import { Component, OnInit, Input } from '@angular/core';

import { BulletinDto } from '../WebClients/dto/BulletinDto.g';
import { MessageService } from '../message.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BulletinService } from '../WebClients/bulletin.service.g';

import { getUuidV4String } from '../uuid';

@Component({
  selector: 'app-bulletin-change',
  templateUrl: './bulletin-change.component.html',
  styleUrls: ['./bulletin-change.component.css', '../bootstrap.css'],
})
export class BulletinChangeComponent implements OnInit {
  bulletin: BulletinDto;
  constructor(
    private messageService: MessageService,
    private bulletinService: BulletinService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getBulletin();
  }

  getBulletin(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bulletinService.GetById(id).subscribe(bulletin => (this.bulletin = bulletin.body));
  }

  Back(): void {
    this.location.back();
  }

  addBulletin(): void {
    this.bulletin.created = this.newDate();
    this.bulletin.id = getUuidV4String();
    this.bulletinService.Add(this.bulletin).subscribe(message => this.messageService.add(message.statusText));
    this.Back();
  }

  changeBulletin(): void {
    this.bulletin.created = this.newDate();
    this.bulletinService.Update(this.bulletin).subscribe(message => this.messageService.add(message.statusText));
    this.Back();
  }

  deleteBulletin(): void {
    this.bulletinService.Delete(this.bulletin.id).subscribe(message => this.messageService.add(message.statusText));
    this.Back();
  }

  newDate(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
