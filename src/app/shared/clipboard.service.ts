import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  private alerts = inject(TuiAlertService)

  constructor() { }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    this.alerts.open('Copied to clipboard', {
      appearance: 'success',
    }).subscribe();
  }
}
