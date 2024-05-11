import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  show(message: string, toastType: string) {
    switch (toastType) {
      case "success": {
        this.toastr.success(message);
        break;
      }
      case "error": {
        this.toastr.error(message);
        break;
      }
      default: {
        this.toastr.show(message);
      }
    }
  }
}
