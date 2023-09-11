import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: any = {};
  loggedIn = false;

  /**
   *
   */
  constructor(private accountService: AccountService) {}

  login() {
    console.log(this.model);

    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      error: (error) => console.log(error),
    });
  }
  logOut() {
    this.loggedIn = false;
  }
}
