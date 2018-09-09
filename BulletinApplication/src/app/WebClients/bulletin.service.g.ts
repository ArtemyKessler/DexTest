import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseRequest } from './BaseRequest';
import { FilterBulletin } from './dto/FilterBulletin.g';
import { BulletinPage } from './dto/BulletinPage.g';
import { BulletinDto } from './dto/BulletinDto.g';
import { DynamicFilter } from './dto/DynamicFilter.g';
import { BulletinFullPagedResult } from './dto/BulletinFullPagedResult.g';
import { Observable, Observer } from 'rxjs';
/* import { Bulletin } from '../bulletin'; */

@Injectable({
  providedIn: 'root',
})
export class BulletinService extends BaseRequest {
  constructor(http: HttpClient) {
    super(http);
  }

  /*  GetByFilters(filter: FilterBulletin, config?: RequestOptionsArgs): Promise<BulletinPage> {
    return this.fetch(
      `/api/Bulletin/GetByFilters`,
      Object.assign(
        {
          method: 'POST',
          body: filter,
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  GetByFilters(filter: FilterBulletin): Observable<HttpResponse<BulletinPage>> {
    return this.post(`/api/Bulletin/GetByFilters`, filter);
  }

  /* GetByPage(page: number, pageSize: number, config?: RequestOptionsArgs): Promise<BulletinFullPagedResult> {
    return this.fetch(
      `/api/Bulletin/GetByPage/${page}/${pageSize}`,
      Object.assign(
        {
          method: 'GET',
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  GetByPage(page: number, pageSize: number): Observable<HttpResponse<BulletinFullPagedResult>> {
    return this.get(`/api/Bulletin/GetByPage/${page}/${pageSize}`);
  }

  /*  GetById(Id: string, config?: RequestOptionsArgs): Promise<Bulletin> {
    return this.fetch(
      `/api/Bulletin/GetById/${Id}`,
      Object.assign(
        {
          method: 'GET',
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  GetById(Id: string): Observable<HttpResponse<BulletinDto>> {
    return this.get(`/api/Bulletin/GetById/${Id}`);
  }

  /* GetByDynamicFilter(dynamicFilter: DynamicFilter, config?: RequestOptionsArgs): Promise<BulletinFullPagedResult> {
    return this.fetch(
      `/api/Bulletin/GetByDynamicFilter`,
      Object.assign(
        {
          method: 'POST',
          body: dynamicFilter,
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  GetByDynamicFilter(dynamicFilter: DynamicFilter): Observable<HttpResponse<BulletinFullPagedResult>> {
    return this.post(`/api/Bulletin/GetByDynamicFilter`, dynamicFilter);
  }

  /* Delete(Id: string, config?: RequestOptionsArgs): Promise<void> {
    return this.fetch(
      `/api/Bulletin/Delete/${Id}`,
      Object.assign(
        {
          method: 'POST',
        },
        config
      )
    )
      .then(() => {})
      .catch(BaseRequest.handleError);
  } */

  Delete(Id: string): Observable<HttpResponse<any>> {
    return this.post(`/api/Bulletin/Delete/${Id}`, undefined);
  }

  /* Add(bulletin: Bulletin, config?: RequestOptionsArgs): Promise<string> {
    return this.fetch(
      `/api/Bulletin/Add`,
      Object.assign(
        {
          method: 'POST',
          body: bulletin,
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  Add(bulletin: BulletinDto): Observable<HttpResponse<string>> {
    return this.post(`/api/Bulletin/Add`, bulletin);
  }

  /* Update(bulletin: Bulletin, config?: RequestOptionsArgs): Promise<string> {
    return this.fetch(
      `/api/Bulletin/Update`,
      Object.assign(
        {
          method: 'POST',
          body: bulletin,
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  Update(bulletin: BulletinDto): Observable<HttpResponse<string>> {
    return this.post(`/api/Bulletin/Update`, bulletin);
  }

  /* GetFullByDynamicFilter(dynamicFilter: DynamicFilter, config?: RequestOptionsArgs): Promise<BulletinFullPagedResult> {
    return this.fetch(
      `/api/Bulletin/GetFullByDynamicFilter`,
      Object.assign(
        {
          method: 'POST',
          body: dynamicFilter,
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  GetFullByDynamicFilter(dynamicFilter: DynamicFilter): Observable<HttpResponse<BulletinFullPagedResult>> {
    return this.post(`/api/Bulletin/GetFullByDynamicFilter`, dynamicFilter);
  }
}
