import { Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  @ViewChild('content') contentElement: ElementRef;
  @ViewChild('menuAndContentWrapper') menuAndContentWrapperElement: ElementRef;

  isLeftMenuVisible = false;
  isSchedeMenuOpened = true;
  isRegistrazioneMenuOpened = true;
  isReportMenuOpened = true;

  contentHeight: number;

  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
        this.showScroll = true;
    } else if (this.showScroll &&
      (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showScroll = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  toggleLeftMenu() {
    this.isLeftMenuVisible = !this.isLeftMenuVisible;
  }

  toggleSchedeMenuArrow() {
      this.isSchedeMenuOpened = !this.isSchedeMenuOpened;
  }

  toggleRegistrazioneMenuArrow() {
      this.isRegistrazioneMenuOpened = !this.isRegistrazioneMenuOpened;
  }

  toggleReportMenuArrow() {
      this.isReportMenuOpened = !this.isReportMenuOpened;
  }

  setSidebarMenuHeight() {
    const contentElementHeight = this.contentElement.nativeElement.offsetHeight;
    const menuAndContentWrapperElementHeight = this.menuAndContentWrapperElement.nativeElement.offsetHeight;

    this.contentHeight = contentElementHeight;

    if (menuAndContentWrapperElementHeight > contentElementHeight) {
      this.contentHeight = menuAndContentWrapperElementHeight;
    }
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit() {
    this.setSidebarMenuHeight();
  }
}
