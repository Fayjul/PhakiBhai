import { AccountService } from './../../_services/account.service';
import { Pagination } from './../../_models/pagination';
import { Observable, take } from 'rxjs';
import { MembersService } from './../../_services/members.service';
import { Component } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { UserParams } from 'src/app/_models/userParams';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  members: Member[] = [];
  members$: Observable<Member[]> | undefined;
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(
    private membersService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }
  ngOnInit() {
    //this.members$ = this.membersService.getMembers();
    this.loadMembers();
  }

  loadMembers() {
    if (!this.userParams) return;
    this.membersService.getMembers(this.userParams).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }

  resetFilters() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }
  pageChanged(event: any) {
    if (this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }
}
