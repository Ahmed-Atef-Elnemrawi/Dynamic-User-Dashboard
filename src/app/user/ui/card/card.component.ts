import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../core/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styles: `
    :host{
      display:block;
      width:100%;
      height:100%;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() user: User | undefined;
}
