import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { single } from 'rxjs';
import { State, selectCurrentPage } from '../../data-access/user-feature';
import { Store } from '@ngrx/store';

@Component({
  selector: 'user-list-paginator',
  standalone: true,
  imports: [],
  template: `
    <div
      class="w-[calc(100dvw-35px)] bg-background-900 px-4 py-2 sm:w-fit sm:max-w-80 rounded-sm shadow-2xl shadow-background-950 flex space-x-3 z-50 text-base md:text-sm place-content-center text-text-200 font-medium font-bodyFont
      m-auto"
    >
      <button
        #btn
        type="button"
        (click)="onPrevious()"
        class="appearance-none border-none hover:text-accent-500 capitalize"
      >
        previous
      </button>

      @for (page of getPageNumbers(); track $index) {
      <button
        type="button"
        #btn
        class="appearance-none border-none hover:text-accent-500 capitalize"
        (click)="updateCurrentPage(page)"
      >
        {{ page }}
      </button>
      }

      <button
        type="button"
        #btn
        (click)="onNext()"
        class="appearance-none border-none hover:text-accent-500 capitalize"
      >
        next
      </button>
    </div>
  `,
  styles: `
  :host{
    display:block;
    width:fit;
    height:fit-content;
    @apply bg-background-950 max-sm:w-dvw sm:py-0 py-4 shadow-2xl shadow-background-900
  }
  button{
    padding-inline:2px;
  }
  `,
})
export class PaginatorComponent implements OnInit, AfterViewInit {
  @ViewChildren('#btn') buttonList!: QueryList<HTMLButtonElement>;
  @Output() paginationChange = new EventEmitter<number>();
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Input() totalPages = 0;

  private currentPage = signal(0);

  constructor(private store: Store<State>, private renderer: Renderer2) {}

  ngOnInit(): void {
    // select current page state from app state store
    const currentPageState = this.store.selectSignal(selectCurrentPage);
    this.currentPage.set(currentPageState());
    console.log(this.currentPage());
  }

  ngAfterViewInit(): void {
  }

  updateCurrentPage(page: number) {
    this.currentPage.update(() => page);
    this.paginationChange.emit(page);
  }

  onNext() {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.update((val) => val + 1);
      this.paginationChange.emit(this.currentPage());
      this.next.emit();
    }
  }

  onPrevious() {
    if (this.currentPage() > 0) {
      this.currentPage.update((val) => val - 1);
      this.paginationChange.emit(this.currentPage());
      this.previous.emit();
    }
  }

  getPageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
