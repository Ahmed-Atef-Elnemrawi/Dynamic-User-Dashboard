import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { AppSettingsService } from '../../../core/app-settings.service';
import { single } from 'rxjs';

@Component({
  selector: 'dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class=" w-14 min-w flex place-items-center place-content-center">
      @if (!isDarkMode()) {
      <button id="toggle-off" (click)="switchToDarkMode()">
        <svg
          id="toggle-off-icon"
          class="w-8 h-8"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <path
            class="fill-accent-700"
            d="M9 11c.628-.836 1-1.874 1-3a4.978 4.978 0 0 0-1-3h4a3 3 0 1 1 0 6H9z"
          />
          <path
            class=" fill-accent-700"
            d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10z"
          />
        </svg>
      </button>
      } @else {
      <button id="toggle-on" (click)="switchToLightMode()">
        <svg
          id="toggle-on-icon"
          class="w-8 h-8 fill-background-100"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class=" fill-accent-700"
            d="M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z"
          />
          <path
            class="fill-accent-700"
            d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z"
          />
        </svg>
      </button>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeToggleComponent {
  isDarkMode = signal(this.appSetting.isDarkMode());

  constructor(private appSetting: AppSettingsService) {}

  switchToDarkMode() {
    this.isDarkMode.update(() => true);
    this.appSetting.toggleDarkModeState(true);
  }

  switchToLightMode() {
    this.isDarkMode.update(() => false);
    this.appSetting.toggleDarkModeState(false);
  }
}
