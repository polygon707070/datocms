import { Component, OnInit, ViewChild } from '@angular/core';
import { DxValidationGroupComponent } from 'devextreme-angular/ui/validation-group';
import { LoginQueryModel } from '../models/login-query.model';
import { LoginResultModel } from '../models/login-result.model';
import { UserService } from '../services/user.service';
import { UiMessagesNotifierService } from '../services/ui-messages-notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginQueryModel = new LoginQueryModel();
  invalidLogin = false;
  errorMessage: string;

  @ViewChild('loginValidationGroup') loginValidationGroup: DxValidationGroupComponent;

  constructor(public userService: UserService,
              private router: Router,
              private uiMessagesNotifierService: UiMessagesNotifierService) { }

  login() {
    this.invalidLogin = false;
    const validationResult = this.loginValidationGroup.instance.validate();
    if (validationResult.isValid === false) {
      return;
    }

    this.userService.login(this.loginData).subscribe(
      (response: LoginResultModel) => {
        console.log(response);
        if (response.success) {
          this.uiMessagesNotifierService.notifyOk('Вход выполнен успешно');
          this.router.navigate(['/user-profile']);
        } else {
          this.invalidLogin = true;
          this.errorMessage = response.errorMessage;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }

}
