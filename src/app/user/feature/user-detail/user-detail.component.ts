import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { State, selectCurrentUser } from '../../data-access/user-feature';
import { Store } from '@ngrx/store';
import { getUser } from '../../data-access/user-actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../../core/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <button
    routerLink="/users"
      type="button"
      class="fixed top-24 max-md:top-32 z-50 font-bodyFont text-lg px-4 py-2 bg-background-900 text-text-500 rounded-sm shadow-2xl shadow-background-950 sm:text-xl md:text-base mx-2"
    >
      Back
    </button>
    <div
      class="w-dvw h-fit flex flex-col sm:flex-row place-content-center place-items-center sm:place-items-start top-32 relative  text-xl sm:text-2xl space-y-6 sm:space-y-0 sm:space-x-6"
    >
      @if (user$ | async; as user) {
      <div class="w-4/5 h-4/5 sm:w-1/4 sm:h-1/4 lg:w-[10%] lg:h-[10%]">
        <img
          [src]="user.avatar"
          class="w-full h-full rounded-sm shadow-2xl shadow-background-900"
          alt="avatar"
        />
      </div>
      <div class="w-fit h-fit px-4 sm:px-0 flex flex-col place-items-start pb-5 space-y-3 sm:space-y-4">
        @for (kv of user|keyvalue; track $index) {
        <div
          class="font-headerFont text-xl sm:text-lg lg:text-sm flex place-items-start space-x-2"
        >
          <p class="text-text-100">{{ kv.key }}:</p>
          <p>{{ kv.value }}</p>
        </div>
        }
      </div>
      }
    </div>
  `,
  styles: `
    :host{
      height:100%;
      width:100%;
    }
  `,
})
export class UserDetailComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private routeState: ActivatedRoute, private store: Store<State>) {
    this.routeState.paramMap
      .pipe(
        tap((param) => {
          const id = param.get('id') ?? 0;
          this.store.dispatch(getUser({ userId: +id }));
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
  }
}
