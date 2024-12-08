import { Component, inject, Input } from '@angular/core';
import { Environment } from '../../models/Environment';
import { TuiAppearance, TuiTitle, TuiButton, TuiHint, TuiHintDirective, TuiAlertService } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';

@Component({
  selector: 'app-environment-card',
  imports: [
    TuiAppearance, 
    TuiCardMedium,
    TuiTitle,
    TuiButton, 
    TuiHint,
    TuiHintDirective,
  ],
  templateUrl: './environment-card.component.html',
  styleUrl: './environment-card.component.scss'
})
export class EnvironmentCardComponent {
  @Input() environment!: Environment

  private alerts = inject(TuiAlertService)

  copyPublicKeyToClipboard() {
    navigator.clipboard.writeText(this.environment.public_key)

    this.alerts.open('Public key copied to clipboard', {
      appearance: 'success',
    }).subscribe();
  }

}
