import { Directive, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[stopEvents]'
})
export class StopEventsDirective {
  @HostListener('mousedown', ['$event']) onMouseDown(event: Event) {
    event.stopPropagation();
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
  }
}
