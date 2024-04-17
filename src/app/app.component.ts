import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/feature/header.component';
import { UserListComponent } from './user/feature/user-list/user-list.component';
import { Store } from '@ngrx/store';
import { State } from './core/store/app-feature';
import { single, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppSettingsService } from './core/app-settings.service';

@Component({
  selector: 'dashboard-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '[class.dark]': 'isDarkMode()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'DynamicUserDashboard';
  appConfig = inject(AppSettingsService);

  isDarkMode = computed(() => this.appConfig.isDarkMode());
}
