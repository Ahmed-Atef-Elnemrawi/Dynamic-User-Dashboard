import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  isDarkMode = signal(this.storage.getIsDarkMode());

  constructor(private storage: LocalStorageService) {}

  //update and toggle dark mode based on current state
  toggleDarkModeState(state: boolean) {
    this.isDarkMode.update(() => state);
    this.updateLocalStorage(state);
  }

  private updateLocalStorage(state: boolean) {
    this.storage.setDarkMode(state);
  }
}
