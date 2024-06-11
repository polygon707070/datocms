import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigModel } from '../models/app-config.model';

@Injectable()
export class AppConfigurationService {

  private appConfig: AppConfigModel;

  get config() {
    return this.appConfig;
  }

  constructor(private httpClient: HttpClient) { }

  loadConfigurations(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get('./assets/config.json')
        .subscribe((data: AppConfigModel) => {
          this.appConfig = data;
          resolve(true);
        });
    });
  }
}
