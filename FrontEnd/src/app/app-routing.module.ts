import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './access-guards/logged-in.guard';
import { LoggedOutGuard } from './access-guards/logged-out.guard';
import { CanEditArticlesGuard } from './access-guards/can-edit-articles.guard';
import { CanEditTagsGuard } from './access-guards/can-edit-tags.guard';
import { CanEditKeyWordsGuard } from './access-guards/can-edit-key-words.guard';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageTagsComponent } from './manage-tags/manage-tags.component';
import { ManageKeyWordsComponent } from './manage-key-words/manage-key-words.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'manage-articles',
    component: ManageArticlesComponent,
    canActivate: [LoggedInGuard, CanEditArticlesGuard]
  },
  {
    path: 'manage-tags',
    component: ManageTagsComponent,
    canActivate: [LoggedInGuard, CanEditTagsGuard]
  },
  {
    path: 'manage-key-words',
    component: ManageKeyWordsComponent,
    canActivate: [LoggedInGuard, CanEditKeyWordsGuard]
  },
  {
    path: 'manage-comments',
    component: ManageCommentsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
