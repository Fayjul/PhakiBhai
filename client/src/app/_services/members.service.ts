import { PaginatedResult, Pagination } from './../_models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) {}

  getMembers(page?: number, itemsPerPage?: number) {
    //if (this.members.length > 0) return of(this.members);
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http
      .get<Member[]>(this.baseUrl + 'user/', { observe: 'response', params })
      .pipe(
        map((response) => {
          if (response.body) {
            this.paginatedResult.result = response.body;
          }
          const pagination = response.headers.get('Pagination');
          if (pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination);
          }
          return this.paginatedResult;
        })
      );
  }

  getMember(usereName: string) {
    const member = this.members.find((x) => x.userName === usereName);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'user/' + usereName);
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user/', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'user/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'user/delete-photo/' + photoId);
  }
}
