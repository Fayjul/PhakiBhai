import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'user/');
  }

  getMember(usereName: string) {
    return this.http.get<Member>(this.baseUrl + 'user/' + usereName);
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user/', member);
  }
}
