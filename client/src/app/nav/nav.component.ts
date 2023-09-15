import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: any = {};
  // loggedIn = false;
  //currentUser$: Observable<User | null> = of(null);

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log(this.model);

    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/members');
      },
      error: (error) => console.log(error),
    });
  }
  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
