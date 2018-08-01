import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import { BulletinApiRequest } from './WebClients/bulletin.service.g';
import { UserApiRequest } from './WebClients/user.service.g';

function generate(): string {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


class User {
  name: string;
  id: string;
  constructor(name: string) {
    this.name = name;
    this.id = generate();
  }
}

class Advert {
  id: string;
  num: number;
  user: string;
  text: string;
  rating: number;
  date: string;
  constructor(num: number, user: string, text: string, rating: number, date: string) {
    this.id = generate();
    this.num = num;
    this.user = user;
    this.text = text;
    this.rating = rating;
    this.date = date;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [BulletinApiRequest, UserApiRequest],
  styleUrls: ['./app.component.css', './bootstrap-theme.css', './bootstrap.css']
})
export class AppComponent  implements OnInit {

  users: User[] =
    [
      {name: 'Тестовый.А', id: '40b21b52-85f7-4054-a0c7-dc5f4c7191a8'}
    ];

  adverts: Advert[] =
    [
      {num: 1, user: 'Тестовый.А', text: 'Сегодня состоится хакатон 2', rating: 1, date: '2018-07-03',
        id: 'bd076f63-1a57-4070-98f7-ccbfebdebff6'}
    ];

  advertsToShow: Advert[] = this.adverts.slice(0);

  empty: number[] =
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ];
  title = 'app';
  advertChanging: Advert;
  num: number;
  user: string;
  text: string;
  rating: number;
  date: string;
  currentPage: number;
  rowsShowed: number;
  userSearch: string;
  startDate: string;
  endDate: string;
  startDay: number;
  endDay: number;
  search: string;
  ngOnInit() {
   this.rowsShowed = 10;
   this.currentPage = 1;
   this.userSearch = '';
   this.advertsToShow = this.adverts.slice(0);
   this.search = '';
   this.Filter();
  }
  dateConvert(Date: string): number {
    let Day: number;
    Day = +Date.substr(0, 4);
    Day *= 100;
    Day += +Date.substr(5, 2);
    Day *= 100;
    Day += +Date.substr(8, 2);
    return Day;
  }
  Filter(): void {
    this.advertsToShow = this.adverts.slice(0);
    this.advertsToShow = this.advertsToShow.filter(Ad => (Ad.text.indexOf(this.search) > -1));
    this.advertsToShow = this.advertsToShow.filter(Ad => (Ad.user.indexOf(this.userSearch) > -1));
    if (this.startDate !== undefined) {
      this.startDay = this.dateConvert(this.startDate);
      this.advertsToShow = this.advertsToShow.filter(Ad => (this.dateConvert(Ad.date) > this.startDay));
    }
    if (this.endDate !== undefined) {
      this.endDay = this.dateConvert(this.endDate);
      this.advertsToShow = this.advertsToShow.filter(Ad => (this.dateConvert(Ad.date) < this.endDay));
    }
    let begin: number;
    let end: number;
    begin = (this.currentPage - 1) * this.rowsShowed;
    end = (this.currentPage) * this.rowsShowed;
    this.advertsToShow.slice(begin, end);
    }

 addAdvert(num: number, user: string, text: string, rating: number, date: string): void {
   this.adverts.unshift(new Advert(num, user, text, rating, date));
   this.advertsToShow = this.adverts.slice(0);
   let f: boolean;
   f = true;
   for (let i = 0; i < this.users.length; i ++) {
     if (this.users[i].name === user) {
       f = false;
     }
    }
   if (f) {
     this.users.push(new User(user));
    }
   this.empty.pop();
   this.Filter();
 }
 changeAdvert(advert: Advert): void {
   this.num = advert.num;
   this.user = advert.user;
   this.text = advert.text;
   this.rating = advert.rating;
   this.date = advert.date;
   this.advertChanging = advert;
 }
   deleteAdvert(): void {
   this.adverts.splice(this.adverts.indexOf(this.advertChanging), 1);
   this.advertsToShow = this.adverts.slice(0);
   this.empty.push(0);
   this.Filter();
   }
   rowsShowedChange(): void {
   let filled: number;
   filled = this.empty.length + this.advertsToShow.length;
   if (this.rowsShowed > filled) {
     for (let i = 0; i < this.rowsShowed - filled; i++) {
       this.empty.push(0);
     }
   }
   if (this.rowsShowed < filled) {
     if (this.adverts.length > this.rowsShowed) {
       for (let i = 0; i < this.empty.length; i++) {
         this.empty.pop();
       }
     } else {
       for (let i = 0; i < filled - this.rowsShowed; i++) {
         this.empty.pop();
       }
     }
   }
 }
 currentPageIncr(): void {
   if (this.currentPage < 100) {
     this.currentPage++;
   }
   if (this.currentPage > 1) {
     document.getElementById('backButton').style.display = 'block';
   }
   if (this.currentPage === 100) {
     document.getElementById('forthButton').style.display = 'none';
   }
     this.Filter();
 }
 currentPageDecr(): void {
   this.currentPage--;
   if (this.currentPage < 2) {
     document.getElementById('backButton').style.display = 'none';
   }
   if (this.currentPage < 100) {
     document.getElementById('forthButton').style.display = 'block';
   }
   this.Filter();
 }
 endPageJmp(): void {
   this.currentPage = 100;
   document.getElementById('forthButton').style.display = 'none';
   document.getElementById('backButton').style.display = 'block';
   document.getElementById('firstButton').style.display = 'block';
 }
 advertFormPop(): void {
   document.getElementById('advertForm').style.display = 'block';
 }
 advertFormHide(): void {
   document.getElementById('advertForm').style.display = 'none';
 }
 numberSort(): void {
   function compareNumber(Ad1: Advert, Ad2: Advert): number {
    return Ad1.num - Ad2.num;
   }
   this.advertsToShow.sort(compareNumber);
 }
  ratingSort(): void {
   function compareRating(Ad1: Advert, Ad2: Advert): number {
    return Ad1.rating - Ad2.rating;
   }
   this.advertsToShow.sort(compareRating);
 }
  dateSort(): void {
    function compareDate(Ad1: Advert, Ad2: Advert): number {
     return this.dateConvert(Ad1.date) - this.dateConvert(Ad2.date);
    }
    this.advertsToShow.sort(compareDate);
  }
}
