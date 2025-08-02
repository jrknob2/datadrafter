import { Component, Input } from '@angular/core';

@Component({
  selector: 'dd-mouse-tracker',
  templateUrl: './mouse-tracker.component.html',
  styleUrl: './mouse-tracker.component.scss',
  standalone: true,
})
export class MouseTracker {
  @Input() coords: { x: number; y: number } | null = null;
}
