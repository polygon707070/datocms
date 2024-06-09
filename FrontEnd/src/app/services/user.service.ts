import { Injectable } from '@angular/core';
import { LoginQueryModel } from '../models/login-query.model';
import { UserSessionDataModel } from '../models/user-session-data.model';
import { UserPermissionsModel } from '../models/user-permissions.model';
import { LoginResultModel } from '../models/login-result.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { AppConfigurationService } from './app-configuration.service';
import { LoaderService } from './loader/loader.service';
import { StorageService } from './storage.service';
import { UiMessagesNotifierService } from '../services/ui-messages-notifier.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    private isLoggedIn = false;
    get loggedIn(): boolean { return this.isLoggedIn; }

    private userSessionDataModel: UserSessionDataModel = new UserSessionDataModel();
    get userSessionData(): UserSessionDataModel { return this.userSessionDataModel; }

    constructor(private router: Router,
                private storageService: StorageService,
                private http: HttpClient,
                private appConfigurationService: AppConfigurationService,
                private uiMessagesNotifierService: UiMessagesNotifierService,
                private loader: LoaderService) {
        this.isLoggedIn = this.storageService.checkIfExistUserSessionDataInStorage();
        if (this.isLoggedIn) {
            this.userSessionDataModel = this.storageService.getUserSessionData();
        }
    }

    login(loginData: LoginQueryModel) {
        this.loader.show();
        const urlRequest = `${this.appConfigurationService.config.apiHostUrl}/api/auth/login`;
        return this.http.post<LoginResultModel>(urlRequest, loginData).pipe(
            map((response: LoginResultModel) => {
                if (response.success) {
                    this.userSessionDataModel.userName = loginData.userName;
                    this.userSessionDataModel.token = response.token;
                    this.userSessionDataModel.userPermissions = response.permissions;
                    this.storageService.saveUserSessionData(this.userSessionDataModel);
                    this.isLoggedIn = true;
                }
                return response;
            }),
            finalize(() => {
                this.loader.hide();
            })
        );
    }

    logout() {
        this.isLoggedIn = false;
        this.userSessionDataModel = new UserSessionDataModel();
        this.storageService.deleteUserSessionData();
        this.uiMessagesNotifierService.notifyOk('Выход выполнен успешно');
        this.router.navigate(['/login']);
    }

    checkIsAuthenticated(): Observable<boolean> {
        this.loader.show();
        const urlRequest = `${this.appConfigurationService.config.apiHostUrl}/api/auth/check-is-authenticated`;
        return this.http.post<boolean>(urlRequest, {}).pipe(
            finalize(() => {
                this.loader.hide();
            })
        );
    }

    getUserPermissions(): Observable<UserPermissionsModel> {
        this.loader.show();
        const urlRequest = `${this.appConfigurationService.config.apiHostUrl}/api/auth/get-user-permissions`;
        return this.http.get<UserPermissionsModel>(urlRequest).pipe(
            finalize(() => {
                this.loader.hide();
            })
        );
    }
}
