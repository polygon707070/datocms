// localization
import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';
const messagesIt = require('devextreme/localization/messages/ru.json');
loadMessages(messagesIt);
locale('ru');

// models
import { AppConfigModel } from './models/app-config.model';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DxMenuModule } from 'devextreme-angular';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

// services
import { LoaderService } from './services/loader/loader.service';
import { AppConfigurationService } from './services/app-configuration.service';
import { UiMessagesNotifierService } from './services/ui-messages-notifier.service';
import { UserService } from './services/user.service';
import { WebApiService } from './services/web-api.service';
import { StorageService } from './services/storage.service';
import { LoggedInGuard } from './access-guards/logged-in.guard';
import { LoggedOutGuard } from './access-guards/logged-out.guard';
import { CanEditArticlesGuard } from './access-guards/can-edit-articles.guard';
import { CanEditTagsGuard } from './access-guards/can-edit-tags.guard';
import { CanEditKeyWordsGuard } from './access-guards/can-edit-key-words.guard';
import { GenericHttpErrorInterceptor } from './interceptors/generic-http-error-interceptor';
import { TokenInterceptor } from './interceptors/token-interceptor';

// components
import { AppComponent } from './app.component';
import { LoaderComponent } from './services/loader/loader.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageTagsComponent } from './manage-tags/manage-tags.component';
import { ManageKeyWordsComponent } from './manage-key-words/manage-key-words.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { NewsComponent } from './news/news.component';

export function loadConfig(config: AppConfigurationService) {
  return (): Promise<AppConfigModel> => {
    return config.loadConfigurations();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    HomePageComponent,
    ManageArticlesComponent,
    UserProfileComponent,
    ManageTagsComponent,
    ManageKeyWordsComponent,
    ManageCommentsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxMenuModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule
  ],
  providers: [
    LoaderService,
    UiMessagesNotifierService,
    UserService,
    WebApiService,
    StorageService,
    LoggedInGuard,
    LoggedOutGuard,
    CanEditArticlesGuard,
    CanEditTagsGuard,
    CanEditKeyWordsGuard,
    AppConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [AppConfigurationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GenericHttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
