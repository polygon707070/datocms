import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.userService.checkIsAuthenticated().pipe(map(
      response => {
        if (!response) {
            return true;
        } else {
          this.router.navigate(['/user-profile']);
          return false;
        }
      },
      error => {
        this.router.navigate(['/home']);
      }
    ));
  }
}
