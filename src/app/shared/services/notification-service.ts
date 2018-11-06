import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
    constructor(public toastr: ToastsManager) {}

    success(msg: string, header: string): void {
        this.toastr.success(msg, header, { maxShown: 2, showCloseButton: true });
    }

    error(msg: string, header: string): void {
        this.toastr.error(msg, header, { toastLife: 5000, maxShown: 2, showCloseButton: true });
    }

    warning(msg: string, header: string): void {
        this.toastr.warning(msg, header, { maxShown: 2, showCloseButton: true });
    }

    info(msg: string): void {
        this.toastr.info(msg);
    }

    custom(msg: string): void {
        this.toastr.custom(msg, null, { enableHTML: true, maxShown: 2, showCloseButton: true });
    }
}
