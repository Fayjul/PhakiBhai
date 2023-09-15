import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: any = {};
  // loggedIn = false;
  //currentUser$: Observable<User | null> = of(null);

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    console.log(this.model);

    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
    });
  }
  logOut() {
    this.accountService.logout();
  }
}
