import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeading]'
})
export class HeadingDirective {

  constructor( private el:ElementRef) { 
    console.log(el);
    el.nativeElement.style.backgroundColor="red"
    
  }

}
