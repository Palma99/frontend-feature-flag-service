import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiPopup, TuiButton } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { FlagListComponent } from '../environment-drawer/flag-list/flag-list.component';
import { NewFlagFormComponent } from '../new-flag-form/new-flag-form.component';
import { FlagDrawerService } from './flags-drawer.service';
import { ProjectFlagsListComponent } from "./project-flags-list/project-flags-list.component";

@Component({
  selector: 'app-flags-drawer',
  imports: [
    TuiPopup,
    TuiDrawer,
    TuiButton,
    TuiDrawer,
    TuiHeader,
    FormsModule,
    NewFlagFormComponent,
    ProjectFlagsListComponent
],
  templateUrl: './flags-drawer.component.html',
  styleUrl: './flags-drawer.component.scss'
})
export class FlagsDrawerComponent {
  protected flagDrawerService = inject(FlagDrawerService)

}
