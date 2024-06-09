import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable()
export class UiMessagesNotifierService {

  constructor() {}

  notifyInfo(message: string) {
    notify({
      message,
      position: {
        my: 'right top',
        at: 'right top',
        offset: '-20 90'
      },
      width: 300
    }, 'info', 2500);
  }

  notifyOk(message: string) {
    notify({
      message,
      position: {
        my: 'right top',
        at: 'right top',
        offset: '-20 90'
      },
      width: 300
    }, 'success', 2500);
  }

  notifyError(message: string) {
    notify({
      message,
      position: {
        my: 'right top',
        at: 'right top',
        offset: '-20 90'
      },
      width: 300
    }, 'error', 2500);
  }

  notifyWarning(message: string) {
    notify({
      message,
      position: {
        my: 'right top',
        at: 'right top',
        offset: '-20 90'
      },
      width: 300
    }, 'warning', 2500);
  }

}
