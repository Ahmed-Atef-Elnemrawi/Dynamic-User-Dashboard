import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { User } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchResultAnimateDirective } from '../../utils/search-result-animate.directive';

@Component({
  selector: 'search-result-list',
  standalone: true,
  imports: [CommonModule, RouterLink,SearchResultAnimateDirective],
  template: `
    <div
      searchResultAnimate
      *ngIf="users.length && isEnabled"
      class="w-full h-[50dvh] flex flex-col place-content-start place-items-start bg-background-900 p-8 rounded-sm shadow-sm shadow-background-800 overflow-scroll absolute cursor-pointer"
    >
      <ng-container>
        @for(user of users; track $index){
        <a
          [routerLink]="['users', user.id]"
          class=" w-full font-bodyFont p-2 hover:bg-accent-800 hover:cursor-pointer"
        >
          {{ user.last_name + ' ' + user.first_name }}
        </a>
        }
      </ng-container>
    </div>
  `,
  styles: `
  :host{
    display:block;
    width:inherit;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultListComponent {
  @Input() users!: User[];
  @Input() isEnabled = false;
}
