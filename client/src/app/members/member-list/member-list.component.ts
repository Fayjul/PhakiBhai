import { Pagination } from './../../_models/pagination';
import { Observable } from 'rxjs';
import { MembersService } from './../../_services/members.service';
import { Component } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  members: Member[] = [];
  members$: Observable<Member[]> | undefined;
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 5;

  constructor(private membersService: MembersService) {}
  ngOnInit() {
    //this.members$ = this.membersService.getMembers();
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }
  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMembers();
    }
  }
}
