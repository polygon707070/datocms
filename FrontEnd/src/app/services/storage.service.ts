import { Injectable } from '@angular/core';
import { UserSessionDataModel } from '../models/user-session-data.model';

@Injectable()
export class StorageService {

  constructor() { }

  saveUserSessionData(userSessionData: UserSessionDataModel) {
    localStorage.setItem('ums_userSessionData', JSON.stringify(userSessionData));
  }

  getUserSessionData(): UserSessionDataModel {
    const userSessionDataFromStorage = localStorage.getItem('ums_userSessionData');
    const userSessionData: UserSessionDataModel = JSON.parse(userSessionDataFromStorage);
    return userSessionData;
  }

  deleteUserSessionData() {
    localStorage.removeItem('ums_userSessionData');
  }

  checkIfExistUserSessionDataInStorage(): boolean {
    const userSessionDataExistInStorage: boolean = !!localStorage.getItem('ums_userSessionData');
    return userSessionDataExistInStorage;
  }
}
