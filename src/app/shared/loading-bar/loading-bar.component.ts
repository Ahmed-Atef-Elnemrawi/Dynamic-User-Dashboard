import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'loading-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="w-24 h-fit p-2 flex place-content-between place-items-center space-x-3 shadow-2xl shadow-background-950">
    <div class="before bg-accent-600 "></div>
    <div class="loader bg-accent-600 "></div>
    <div class="after bg-accent-600 "></div>
  </div>
  `,
  styles: `
  .loader,
  .before,
  .after {
    width: .8rem;
    height: .8rem;
    animation-fill-mode: both;
    animation: bblFadInOut 1.8s infinite ease-in-out;
    @apply shadow-2xl shadow-background-950 rounded-sm
  }

  .loader {
    // position: absolute;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }


  .before {
    animation-delay: -0.32s;
  }

  .after {
  }

  @keyframes bblFadInOut {
    0%, 80%, 100% { opacity: 0.1;  transform: scale(0); }
    40% { opacity: 1;  transform: scale(1.2)}
  }

  :host{
    // width:fit-content;
    // height:fit-content;
    // z-index:999;
    // @apply backdrop-blur-xl

  }
  `
})
export class LoadingBarComponent {

}
