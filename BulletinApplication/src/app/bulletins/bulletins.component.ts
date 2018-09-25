import { Component, OnInit } from '@angular/core';

/* import { Bulletin } from '../bulletin'; */
import { BulletinDto } from '../WebClients/dto/BulletinDto.g';

import { BulletinService } from '../WebClients/bulletin.service.g';
import { UserService } from '../WebClients/user.service.g';
import { ParamService } from '../param.service';

import { Param } from '../param';
import { FilterBulletin } from '../WebClients/dto/FilterBulletin.g';
import { Paged } from '../WebClients/dto/Paged.g';
import { SortParamDto } from '../WebClients/dto/SortParamDto.g';
import { User } from '../WebClients/dto/User.g';
import { DynamicFilter } from '../WebClients/dto/DynamicFilter.g';

@Component({
  selector: 'app-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.css', '../bootstrap.css'],
})
export class BulletinsComponent implements OnInit {
  bulletins: BulletinDto[];
  selectedBulletin: BulletinDto;

  users: User[];

  sortParams: SortParamDto[];

  userSearch: string;
  startDate: Date;
  endDate: Date;
  search: string;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private bulletinService: BulletinService,
    private userService: UserService,
    private paramService: ParamService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getBulletins();
  }

  getUsers(): void {
    const dynamicFilter: DynamicFilter = { filter: null, paged: null, sortParams: null };
    this.userService.GetFullByDynamicFilter(dynamicFilter).subscribe(users => (this.users = users.body.result));
  }

  getBulletins(): void {
    let paged: Paged;
    paged = { page: this.pageNumber, pageSize: this.pageSize };
    function userIdbyName(user) {
      if (user.name === this.userSearch) {
        return user;
      }
    }
    const userId: string = this.users.find(userIdbyName).id;
    let filterBulletin: FilterBulletin;
    filterBulletin = {
      pageFilter: paged,
      sortParams: this.sortParams,
      userId: userId,
      searchText: this.search,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.bulletinService
      .GetByFilters(filterBulletin)
      .subscribe(bulletins => (this.bulletins = bulletins.body.bulletins));
  }

  addSortParam(param: Param): void {
    const sortParam: SortParamDto = {
      fieldName: param.englishParamName,
      isDesc: true,
    };
    this.sortParams.push(sortParam);
  }

  DateFormat(date: Date): string {
    let dateStr: string;
    dateStr = date.getFullYear().toString();
    dateStr += '-';
    dateStr += (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    dateStr += '-';
    dateStr += (date.getDate() < 10 ? '0' : '') + date.getDate();
    return dateStr;
  }

  pageNumberDecr(): void {
    this.pageNumber--;
  }

  pageNumberIncr(): void {
    this.pageNumber++;
  }

  pageNumberMaxJmp(): void {
    this.pageNumber = 100;
  }
}
