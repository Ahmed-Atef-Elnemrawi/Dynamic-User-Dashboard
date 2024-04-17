import { Directive, ElementRef } from '@angular/core';
import {gsap} from 'gsap'

@Directive({
  selector: '[searchResultAnimate]',
  standalone: true
})
export class SearchResultAnimateDirective {

  constructor(private el:ElementRef) {

    const searchResultEl = el.nativeElement as HTMLElement;

    gsap.defaults({duration:1, ease:'power3.inOut'})
    gsap.from(searchResultEl,{
      translateY:'-100%',
      zIndex:1,
      opacity:0,
    })
  }

}
