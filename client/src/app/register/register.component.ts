import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister: EventEmitter<any> = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) { }
  register() {
    // console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error: any) => console.log(error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
