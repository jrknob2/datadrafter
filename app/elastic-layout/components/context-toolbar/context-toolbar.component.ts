import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

export enum ContextIndex {
  Engage = 0,
  Design = 1,
  Model = 2,
  Analyze = 3
}

@Component({
  selector: 'dd-context-toolbar',
  templateUrl: './context-toolbar.component.html',
  styleUrls: ['./context-toolbar.component.scss'],
  imports: [ RouterLink ],
  standalone: true
})
export class ContextToolbarComponent {
  @Output() buttonClick = new EventEmitter<number>();
}
