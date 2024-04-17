import { Component, OnInit, inject } from '@angular/core';
import { SearchFormComponent } from '../ui/search-form/search-form.component';
import { DarkModeToggleComponent } from '../ui/dark-mode-toggle/dark-mode-toggle.component';
import { SearchResultListComponent } from '../ui/search-result-list/search-result-list.component';
import { Store } from '@ngrx/store';
import { State, selectSearchResult } from '../../core/store/app-feature';
import { appActions } from '../../core/store/app-actions';
import { Observable } from 'rxjs';
import { User } from '../../core/models';

@Component({
  selector: 'dashboard-header',
  standalone: true,
  imports: [
    SearchFormComponent,
    SearchResultListComponent,
    DarkModeToggleComponent,
  ],
  template: `
    <div
      class="w-dvw h-[18dvh] sm:h-[calc(18dvh-35px)] p-4 flex place-items-center bg-background-950 place-content-center shadow-sm shadow-background-900  z-50 border-b border-background-900"
    >
      <search-form class="flex-1" (search)="onSearch($event)" />
      <dark-mode-toggle />
    </div>
  `,
  styles: `
  :host{
    display:block;
    z-index:9999;
  }
  `,
})
export class HeaderComponent implements OnInit {
  private store = inject(Store<State>);

  users$: Observable<User[]> | undefined;

  ngOnInit(): void {
    this.users$ = this.store.select(selectSearchResult);
  }

  //dispatch user search action to store to search for the users
  onSearch(userId: number) {
    this.store.dispatch(appActions.searchUser({ id: userId }));
  }
}
