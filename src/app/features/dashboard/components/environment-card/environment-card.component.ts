import { Component, inject, Input, output, Output } from '@angular/core';
import { Environment } from '../../models/Environment';
import { TuiAppearance, TuiTitle, TuiButton, TuiHint, TuiHintDirective, TuiAlertService } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { ClipboardService } from '../../../../shared/clipboard.service';

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

  clipboardService = inject(ClipboardService)

  openDrawer = output<number>()
}
