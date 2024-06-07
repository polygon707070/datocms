import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';
import { ILoaderState } from './ILoaderState';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.show = state.show;
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
