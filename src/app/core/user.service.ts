import { Injectable, inject } from '@angular/core';
import { BACKEND_URL_Token } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { User } from './models';
import { debounceTime, delay, shareReplay } from 'rxjs';

export type Response = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

//I going to use providedIn:'root' to enable tree-shaking if it possible
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private backendUrl = inject(BACKEND_URL_Token);
  private http = inject(HttpClient);

  getUsers$ = (page: number) =>
    this.http.get<Response>(this.backendUrl.usersUrl, {
      params: {
        page,
      },
    }).pipe(delay(1500));

  getUser$ = (userId: number) =>
    this.http.get<{data:User}>(`${this.backendUrl.usersUrl}/${userId}`);
}
