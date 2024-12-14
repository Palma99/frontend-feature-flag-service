import { Component, inject, signal } from '@angular/core';
import { FlagDrawerService } from '../flags-drawer.service';
import { FormsModule } from '@angular/forms';
import { TuiAlertService, TuiDataList, TuiDialogService, TuiDropdown } from '@taiga-ui/core';
import { FlagListItemComponent } from "./flag-list-item/flag-list-item.component";
import { FlagService } from '../../../flag.service';
import {TUI_CONFIRM} from '@taiga-ui/kit';

@Component({
  selector: 'app-project-flags-list',
  imports: [
    FormsModule,
    TuiDropdown,
    TuiDataList,
    FlagListItemComponent
],
  templateUrl: './project-flags-list.component.html',
  styleUrl: './project-flags-list.component.scss'
})
export class ProjectFlagsListComponent {
  flagService = inject(FlagService);
  alert = inject(TuiAlertService);
  flagDrawerService = inject(FlagDrawerService);
  private readonly dialogs = inject(TuiDialogService);

  loadingActionId = signal<number | null>(null)

  confirmDeleteFlag(flagId: number) {
    this.dialogs.open<boolean>(TUI_CONFIRM, {
      label: 'Delete flag',
      data: {
        content: 'Are you sure you want to delete this flag?',
        yes: 'Delete',
        no: 'Cancel',
      }
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.handleDeleteFlag(flagId)
      }
    });
  }

  handleDeleteFlag(flagId: number) {
 
    this.loadingActionId.set(flagId)

    this.flagService.deleteFlag(flagId).subscribe({
      next: () => {
        this.flagDrawerService.fetchProjectFlags()
        this.loadingActionId.set(null)
      },
      error: () => {
        this.loadingActionId.set(null)
        this.alert.open('There was an error deleting the flag, please try again', {
          appearance: 'negative',
        }).subscribe()
      }
    });
  }
}
