import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly DARK_MODE_KEY = 'isDarkMode';

  getIsDarkMode(): boolean {
    let value = this.getItem<boolean>(this.DARK_MODE_KEY);

    if (value === null) {
      this.setDarkMode(false);
      value = false;
    }
    return value;
  }

  setDarkMode(value: boolean): void {
    this.setItem(this.DARK_MODE_KEY, value);
  }

  private getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  private setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
