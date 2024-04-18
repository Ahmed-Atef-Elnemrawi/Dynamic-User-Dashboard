import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Signal,
} from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { User } from '../../../core/models';
import {
  State,
  selectCurrentPage,
  selectIsLoading,
  selectTotalPage,
  selectUsers,
} from '../../data-access/user-feature';
import { Store } from '@ngrx/store';
import { getUsers } from '../../data-access/user-actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../../ui/paginator/paginator.component';
import { LoadingBarComponent } from '../../../shared/loading-bar/loading-bar.component';

import { gsap,} from 'gsap';
import { CustomEase } from 'gsap/all';

@Component({
  selector: 'dashboard-user-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    PaginatorComponent,
    LoadingBarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="container" class="w-fit h-fit">
      <div
        class="w-dvw px-4 sm:px-6  py-16 flex flex-col sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 sm:gap-4 md:gap-3.5 md:grid-cols-3 md:grid-rows-2 md:px-2 lg:px-24 lg:gap-5
      place-content-center place-items-stretch sm:place-content-evenly md:place-content-center space-y-3 sm:space-y-0 relative"
      >
        @for (user of users$|async; track $index) {
        <card id="card" class="w-fit h-fit flex-1" [user]="user" />
        }@empty {
        <p
          *ngIf="!(isLoading$ | async)"
          class="font-headerFont text-text-300 text-base sm:text-sm capitalize absolute left-1/2 -translate-x-1/2 tracking-wide"
        >
          there is no users yet!
        </p>
        }
      </div>
    </div>

    <loading-bar
      class="fixed bottom-1/2 sm:bottom-[calc(33.33%-10px)]"
      *ngIf="isLoading$ | async;"
    />
    <user-list-paginator
      class="fixed bottom-0 sm:bottom-20 right-0 left-0"
      [totalPages]="totalPage()"
      (paginationChange)="onPageChange($event)"
      (next)="onNext()"
      (previous)="onPrevious()"
    />
  `,
  styles: `
  :host{
    display:flex;
    flex-direction:column;
    place-content:space-between;
    place-items:center;
    position:relative;
  }
  `,
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[] | undefined>;
  totalPage!: Signal<number>;
  isLoading$!: Observable<boolean>;
  currentPage!: Signal<number>;

  constructor(private store: Store<State>, private el: ElementRef) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers({ page: 1 }));
    this.users$ = this.store.select(selectUsers);
    this.totalPage = this.store.selectSignal(selectTotalPage);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.currentPage = this.store.selectSignal(selectCurrentPage);
  }

  onPageChange(page: number) {
    this.store.dispatch(getUsers({ page }));
  }

  onNext() {
    this.animateNextNavigation();
  }

  onPrevious() {
    this.animatePreviousNavigation();
  }

  private animateNextNavigation(){
    const container = this.el.nativeElement.querySelector('#container');
    gsap.from(container, {
      translateX: '100%',
      opacity:0,
      scale:.8,
      duration: 1.6,
      ease:  CustomEase.create("custom", "M0,0 C0.61,1 0.88,1 1,1 ")
    });

  }
  
  private animatePreviousNavigation(){
    const container = this.el.nativeElement.querySelector('#container');
    gsap.from(container, {
      translateX: '-100%',
      opacity:0,
      scale:.8,
      duration: 1.6,
      ease:  CustomEase.create("custom", "M0,0 C0.61,1 0.88,1 1,1 ")
    });
  }
}
