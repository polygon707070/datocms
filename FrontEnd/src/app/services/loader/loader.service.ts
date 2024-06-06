import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILoaderState } from './ILoaderState';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<ILoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next({ show: true } as ILoaderState);
  }

  hide() {
    this.loaderSubject.next({ show: false } as ILoaderState);
  }
}
