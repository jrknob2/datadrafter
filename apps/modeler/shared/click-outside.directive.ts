import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    @Output() clickOutside = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    public onClick(event: MouseEvent): void {
        const target = event.target as HTMLElement | null;

        if (target && !this.elementRef.nativeElement.contains(target)) {
            this.clickOutside.emit();
        }
    }

}
