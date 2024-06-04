import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UiMessagesNotifierService } from '../services/ui-messages-notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public userService: UserService,
              private router: Router,
              private uiMessagesNotifierService: UiMessagesNotifierService) { }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
  }

}
