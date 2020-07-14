import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  constructor(private toastService: ToastrService) { }

  showSucessMessage(title: string, description: string) {
    this.toastService.success(description, title);
  }

  showErrorMessage(title: string, description: string) {
    this.toastService.error(description, title);
  }

  showError(title: string, error: any) {
    if (error.error === undefined) {
      const message = error.message !== undefined ? error.message : error;
      this.toastService.error(message, title);
    } else if (error.statusText.indexOf('Forbidden') !== -1) {
      this.toastService.error('El uso del recurso no está autorizado', title);

    } else if (error.error.Message !== undefined) {
      this.toastService.error(error.error.Message, title);
    } else {
      const message = error.error.Message !== undefined ? error.error.Message : error.error;
      this.toastService.error(message, title);
    }
  }

  showWarningMessage(title: string, description: string) {
    this.toastService.warning(description, title);
  }
}
