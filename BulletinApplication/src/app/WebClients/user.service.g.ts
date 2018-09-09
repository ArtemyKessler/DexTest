import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseRequest } from './BaseRequest';
import { User } from './dto/User.g';
import { DynamicFilter } from './dto/DynamicFilter.g';
import { UserFullPagedResult } from './dto/UserFullPagedResult.g';
import { Observable } from '../../../node_modules/rxjs';
import { Http } from '../../../node_modules/@angular/http';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseRequest {
  constructor(http: HttpClient) {
    super(http);
  }

  /* GetByPage(page: number, pageSize: number, config?: RequestOptionsArgs): Promise<UserFullPagedResult> {
    return this.fetch(
      `/api/User/GetByPage/${page}/${pageSize}`,
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

  GetByPage(page: number, pageSize: number): Observable<HttpResponse<UserFullPagedResult>> {
    return this.get(`/api/User/GetByPage/${page}/${pageSize}`);
  }

  /* GetById(Id: string, config?: RequestOptionsArgs): Promise<User> {
    return this.fetch(
      `/api/User/GetById/${Id}`,
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

  GetById(Id: string): Observable<HttpResponse<User>> {
    return this.get(`/api/User/GetById/${Id}`);
  }

  /* GetByDynamicFilter(dynamicFilter: DynamicFilter, config?: RequestOptionsArgs): Promise<UserFullPagedResult> {
    return this.fetch(
      `/api/User/GetByDynamicFilter`,
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

  GetByDynamicFilter(dynamicFilter: DynamicFilter): Observable<HttpResponse<UserFullPagedResult>> {
    return this.post(`/api/User/GetByDynamicFilter`, dynamicFilter);
  }

  /* Delete(Id: string, config?: RequestOptionsArgs): Promise<void> {
    return this.fetch(
      `/api/User/Delete/${Id}`,
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

  Delete(Id: string): Observable<HttpResponse<void>> {
    return this.post(`/api/User/Delete/${Id}`, undefined);
  }

  /* Add(user: User, config?: RequestOptionsArgs): Promise<string> {
    return this.fetch(
      `/api/User/Add`,
      Object.assign(
        {
          method: 'POST',
          body: user,
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  Add(user: User): Observable<HttpResponse<string>> {
    return this.post(`/api/User/Add`, user);
  }

  /* Update(user: User, config?: RequestOptionsArgs): Promise<string> {
    return this.fetch(
      `/api/User/Update`,
      Object.assign(
        {
          method: 'POST',
          body: user,
        },
        config
      )
    )
      .then(response => response.json())
      .catch(BaseRequest.handleError);
  } */

  Update(user: User): Observable<HttpResponse<string>> {
    return this.post(`/api/User/Update`, user);
  }

  /* GetFullByDynamicFilter(dynamicFilter: DynamicFilter, config?: RequestOptionsArgs): Promise<UserFullPagedResult> {
    return this.fetch(
      `/api/User/GetFullByDynamicFilter`,
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

  GetFullByDynamicFilter(dynamicFilter: DynamicFilter): Observable<HttpResponse<UserFullPagedResult>> {
    return this.post(`/api/User/GetFullByDynamicFilter`, dynamicFilter);
  }
}
