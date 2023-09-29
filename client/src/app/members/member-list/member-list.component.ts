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
  members$: Observable<Member[]> | undefined;

  constructor(private membersService: MembersService) {}
  ngOnInit() {
    this.members$ = this.membersService.getMembers();
  }
}
