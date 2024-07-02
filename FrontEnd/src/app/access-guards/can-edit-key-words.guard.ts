import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { UiMessagesNotifierService } from '../services/ui-messages-notifier.service';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

@Injectable()
export class CanEditKeyWordsGuard implements CanActivate {

  constructor(private userService: UserService,
              private uiMessagesNotifierService: UiMessagesNotifierService,
              private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getUserPermissions().pipe(map(
      response => {
        if (response.canEditKeyWords) {
            return true;
        } else {
          this.uiMessagesNotifierService.notifyWarning('Доступ закрыт');
          this.router.navigate(['/home']);
          return false;
        }
      },
      error => {
        this.router.navigate(['/home']);
      }
    ));
  }
}
