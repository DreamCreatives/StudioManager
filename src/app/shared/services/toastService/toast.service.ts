import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToastTime: number | null = null;

  constructor(private toastr: ToastrService) { }

  show(message: string, toastType: string): void {
    const currentTime = Date.now();

    if (this.lastToastTime && (currentTime - this.lastToastTime < 1000)) return; 

    this.lastToastTime = currentTime;

    switch (toastType) {
      case "success": {
        this.toastr.success(message);
        break;
      }
      case "error": {
        this.toastr.error(message);
        break;
      }
      case "warning": {
        this.toastr.warning(message);
        break;
      }
      case "info": {
        this.toastr.info(message);
        break;
      }
      default: {
        this.toastr.show(message);
      }
    }
  }
}
