import { Component } from '@angular/core';
import { USER_TABLE_HEADERS } from '../common/data/home-page.data';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userTableHeaders: string[] = USER_TABLE_HEADERS;

  constructor(
    public userService: UserService,
  ) {}
}
