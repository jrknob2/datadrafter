import { Component, EventEmitter, HostListener, Output } from '@angular/core';
//import { UnitsOfMeasure } from '../../../../app/models/UnitsOfMeasure';
import { DrawingCanvasComponent } from '../drawing-canvas/drawing-canvas.component';
//import { GridOverlayComponent } from '../grid-overlay/grid-overlay.component';
import { SelectionOverlay } from '../selection-overlay/selection-overlay';
//import { HeadsupDisplayComponent } from '../headsup-display/headsup-display.component';
//import { Shape } from '../../../../app/models/Shape';

@Component({
  selector: 'dd-drawing-view',
  templateUrl: './drawing-view.component.html',
  styleUrls: ['./drawing-view.component.scss'],
  imports: [
    DrawingCanvasComponent,
    //GridOverlayComponent, 
    SelectionOverlay,
    //HeadsupDisplayComponent]
  ]
})
export class DrawingViewComponent {
  @Output() mouseMoved = new EventEmitter<{ x: number; y: number }>(); // Drawing space
  @Output() rawMouseMoved = new EventEmitter<{ clientX: number; clientY: number; relX: number; relY: number }>(); // View-relative
  @Output() mouseDown = new EventEmitter<{ x: number; y: number }>();
  @Output() mouseUp = new EventEmitter<{ x: number; y: number }>();

  viewPoint = '';
  clientPoint = '';
  zoom = 1.0;   // 100% by default
  panX = 0;     // no pan
  panY = 0;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    const x = (relX - this.panX) / this.zoom;
    const y = (relY - this.panY) / this.zoom;

    this.viewPoint = x + ':' + y;
    this.clientPoint = event.clientX + ':' + event.clientY;
    
    this.mouseMoved.emit({ x, y });
    this.rawMouseMoved.emit({ clientX: event.clientX, clientY: event.clientY, relX, relY });
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    const x = (relX - this.panX) / this.zoom;
    const y = (relY - this.panY) / this.zoom;

    this.mouseDown.emit({ x, y });
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    const x = (relX - this.panX) / this.zoom;
    const y = (relY - this.panY) / this.zoom;

    this.mouseUp.emit({ x, y });
  }
}