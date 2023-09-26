import { MembersService } from './../../_services/members.service';
import { Member } from 'src/app/_models/member';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent {
  member: Member | undefined;

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    const userName = this.route.snapshot.paramMap.get('username');
    console.log(userName);
    if (userName == null) return;
    this.membersService.getMember(userName).subscribe({
      next: (member) => (this.member = member),
    });
  }
}
