import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchResultListComponent } from '../search-result-list/search-result-list.component';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { State, selectSearchResult } from '../../../core/store/app-feature';
import { User } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { SearchResultAnimateDirective } from '../../utils/search-result-animate.directive';

@Component({
  selector: 'search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchResultListComponent],
  template: `
    <div
      class="w-full h-fit max-w-xl flex flex-col relative space-y-1.5 focus-within:ring-2 ring-text-700 ring-offset-2 ring-offset-background-950"
    >
      <div class="h-10 w-full grow flex shadow-2xl shadow-background-950">
        <button
          id="search-form"
          class="bg-accent-700 flex place-content-center place-items-center w-10 rounded-tl-sm rounded-bl-sm"
        >
          <svg
            id="search-icon"
            class="w-5 h-5 fill-text-100"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"
            />
          </svg>
        </button>
        <input
          [formControl]="searchInput"
          type="text"
          placeholder="User ID (for lookup)"
          class="block grow bg-background-900 px-4 border-none outline-none appearance-none rounded-tr-sm rounded-br-sm placeholder:text-text-600 font-bodyFont placeholder:font-bodyFont"
        />
      </div>
      <div class="absolute top-10 left-0 right-0">
        <ng-container *ngIf="searchResult$ | async as searchResult">
          <search-result-list
            #searchResultEl
            *ngIf="searchResult.length > 0"
            [users]="searchResult"
            [isEnabled]="searchResultIsEnabled()"
          >
          </search-result-list>
        </ng-container>
      </div>
    </div>
  `,
  styles: `
    :host{
      width:fit-content;
      height:fit-content;
      display:flex;
      place-content:center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements AfterViewInit {
  @Output() search = new EventEmitter<number>();

  searchInput = new FormControl();
  searchResult$: Observable<User[]> | undefined;
  searchResultIsEnabled = signal(false);

  constructor(
    private store: Store<State>,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // emit search event when the user input value
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        tap((val) => {
          if (val) {
            this.search.emit(val);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();

    this.searchResult$ = this.store.select(selectSearchResult);
  }

  ngAfterViewInit(): void {
    const inputEl = this.el.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    this.renderer.listen(inputEl, 'blur', () => this.hideSearchResult());
    this.renderer.listen(inputEl, 'focus', () => this.showSearchResult());
    this.renderer.listen(inputEl, 'input', () =>
      inputEl.value ? this.showSearchResult() : this.hideSearchResult()
    );
  }

  hideSearchResult() {
    setTimeout(() => {
      this.searchResultIsEnabled.update(() => false);
    }, 300);
  }

  showSearchResult() {
    this.searchResultIsEnabled.update(() => true);
  }
}
