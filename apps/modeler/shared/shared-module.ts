import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../shared/click-outside.directive';


@NgModule({
  imports: [
    CommonModule,
    ClickOutsideDirective
  ],
  exports: [ClickOutsideDirective]
})
export class SharedModule { }
