import { Component, input, output, signal } from '@angular/core';
import { Flag } from '../../../../models/Flag';
import { FormsModule } from '@angular/forms';
import { TuiDropdown, TuiButton, TuiDataList, TuiIcon } from '@taiga-ui/core';
import { TuiCell } from '@taiga-ui/layout';
import { TuiButtonLoading } from '@taiga-ui/kit';

@Component({
  selector: 'app-flag-list-item',
  imports: [
    TuiCell,
    FormsModule,
    TuiDropdown,
    TuiButton,
    TuiDataList,
    TuiButtonLoading,
  ],
  templateUrl: './flag-list-item.component.html',
  styleUrl: './flag-list-item.component.scss'
})
export class FlagListItemComponent {
  flag = input<Flag>()
  loading = input<boolean>()
  disabled = input<boolean>()

  editFlag = output<number>()
  deleteFlag = output<number>()

  menuOpen = signal(false)

  handleAction(action: 'edit' | 'delete') {
    const flagId = this.flag()?.id
    if (!flagId) {
      return
    }

    switch (action) {
      case 'edit':
        this.editFlag.emit(flagId)
        break;
      case 'delete':
        this.deleteFlag.emit(flagId)
        break;
    } 
  } 
}
