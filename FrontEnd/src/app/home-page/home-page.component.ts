import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../services/web-api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private webApiService: WebApiService, private userService: UserService) { }

  // check is autenticated
  checkIsAutenticated() {
    this.userService.checkIsAuthenticated().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // get user permissions
  getUserPermissions() {
    this.userService.getUserPermissions().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // editor
  getArticlesList() {
    this.webApiService.getArticlesList().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Manager
  getArticlesTags() {
    this.webApiService.getArticlesTags().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Manager and Editor
  getArticlesKeyWords() {
    this.webApiService.getArticlesKeyWords().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Any autorized
  getArticlesComments() {
    this.webApiService.getArticlesComments().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // open test
  getArticlesCategories() {
    this.webApiService.getArticlesCategories().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}
