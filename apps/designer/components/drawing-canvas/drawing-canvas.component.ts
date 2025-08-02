/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  ChangeDetectorRef, OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Shape } from '../../../../app/models/Shape';
import { Drawing } from '../../../../app/models/Drawing';
import { CommandService } from '../../../../app/services/command.service';
import { getShapeAt } from './utils/drawing-utils'

import {
  drawShape,
  buildCircleFromBox,
  buildEllipseFromBox,
  buildRectangle,
  buildPolygon,
  getCanvasCoordinates
} from './utils/shape-renderer';

@Component({
  selector: 'dd-drawing-canvas',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.scss'],
})
export class DrawingCanvasComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() drawing: Drawing | null = null;
  @Input() editMode: 'scale' | 'direct' = 'scale';

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Output() shapeSelected = new EventEmitter<Shape | null>();
  @Output() mouseMoved = new EventEmitter<{ x: number; y: number }>();
@ViewChild('drawingArea', { static: true }) drawingAreaRef!: ElementRef;
drawingBounds: DOMRect | null = null;
  shapes: Shape[] = [];
  drawnPoints: { x: number; y: number }[] = [];
  mousePos = '';
  selectedShape: Shape | null = null;
  canvasRect: DOMRect | null = null;

  isDrawing = false;
  tempShape: Shape | null = null; // For in-progress shape

  subscriptions: Subscription[] = [];

  currentMode: string | null = null;
  modeOptions: any = {};
  isPreviewPoint = false;
  fontBrightness = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private commandService: CommandService) {
  }

  ngOnInit(): void {
    if (!this.drawing) {
      this.drawing = {
        id: 0,
        name: 'untitled',
        width: 800,
        height: 600,
        style: {
          lineWidth: 2,
          strokeColor: '#000000',
          fillColor: '#cccccc',
          lineStyle: 'solid',
        },
        shapes: [],
        background: '#ffffff',
        transform: {
          rotation: 0,
          scale: 0
        },

      };
    }
    const cmdSub = this.commandService.command$.subscribe(cmd => {
      this.currentMode = cmd;
      this.isDrawing = cmd === 'select' ? false : true;
      this.drawnPoints = [];
    });
    this.subscriptions.push(cmdSub);
  }

  ngAfterViewInit(): void {

    this.updateDrawingBounds();
  window.addEventListener('resize', this.updateDrawingBounds.bind(this));
    this.resizeCanvas();
    this.cdr.detectChanges();
    setTimeout(() => this.syncDrawingWithDOM());
    window.addEventListener('resize', this.updateCanvasRect.bind(this));
  }
updateDrawingBounds() {
  this.drawingBounds = this.drawingAreaRef.nativeElement.getBoundingClientRect();
}
  syncDrawingWithDOM() {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      if (this.drawing) {
        this.drawing.width = rect.width;
        this.drawing.height = rect.height;
        // Optionally, sync background color from DOM as well:
        this.drawing.background = getComputedStyle(this.canvasRef.nativeElement).backgroundColor;
      }
    }
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateCanvasRect.bind(this));
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  updateCanvasRect(): void {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      this.canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();
      setTimeout(() => this.syncDrawingWithDOM());
    }
  }

  resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    const rect = parent.getBoundingClientRect();
    //const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width; // * dpr;
    canvas.height = rect.height; // * dpr;
    canvas.style.width = rect.width + "px"; //`${rect.width}px`;
    canvas.style.height = rect.height + "px"; //`${rect.height}px`;

    //const ctx = canvas.getContext('2d');
    //if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // ensures crispness

    this.redraw(); // redraw shapes after resize!
    // Add this to always sync canvasRect after resize
    this.updateCanvasRect();
  }

  redraw(): void {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const shape of this.shapes) {
      if (this.drawing)
        drawShape(ctx, shape, this.drawing.style);
    }

    // Draw temp shape if exists (in-progress shape)
    if (this.tempShape) {
      if (this.drawing)
        drawShape(ctx, this.tempShape, this.drawing.style);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {

    const point = getCanvasCoordinates(event, this.canvasRef.nativeElement);

    if (this.currentMode === 'select') {
      const shape = getShapeAt(point.x, point.y, this.shapes);
      this.selectedShape = shape;

      if (this.selectedShape != null) {
        this.shapeSelected.emit(shape);
      } else {
        this.shapeSelected.emit(null);
      }
      this.redraw();
      return;
    }

    if (this.isDrawing) {
      // const point = getCanvasCoordinates(event, this.canvasRef.nativeElement);

      // --- Polygon logic ---
      if (this.currentMode === 'draw-polygon') {
        if (this.isPreviewPoint) {
          this.drawnPoints.pop();
          this.isPreviewPoint = false;
        }
        // Shift+click to finish
        if (event.shiftKey && this.drawnPoints.length > 1) {
          this.drawnPoints.push({ ...this.drawnPoints[0] });
          if (this.drawing)
            this.shapes.push(
              buildPolygon(
                this.drawnPoints,
                this.drawing.style,
                this.drawing.transform
              )
            );
          this.drawnPoints = [];
          this.tempShape = null;
          this.redraw();
          return;
        }
        this.drawnPoints.push(point); // add real vertex
        this.redraw();
        return;
      }

      // --- 2-point shape logic (rect, ellipse, circle) ---
      this.drawnPoints.push(point);

      if (this.drawnPoints.length == 2) {
        switch (this.currentMode) {
          case 'draw-rect':
            if (this.drawing)
              this.shapes.push(buildRectangle(
                this.drawnPoints[0],
                this.drawnPoints[1],
                this.drawing.style,
                this.drawing.transform));
            break;
          case 'draw-ellipse':
            if (this.drawing)
              this.shapes.push(buildEllipseFromBox(
                this.drawnPoints[0],
                this.drawnPoints[1],
                this.drawing.style,
                this.drawing.transform));
            break;
          case 'draw-circle':
            if (this.drawing)
              this.shapes.push(buildCircleFromBox(
                this.drawnPoints[0],
                this.drawnPoints[1],
                this.drawing.style,
                this.drawing.transform));
            break;
        }
        this.drawnPoints = [];
        this.tempShape = null;
      }

      this.redraw();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {

    let point = getCanvasCoordinates(event, this.canvasRef.nativeElement);
    this.mousePos = `${point.x}:${point.y}`;

    if (point.x != 0 && point.y != 0)
      this.mouseMoved.emit({ x: point.x, y: point.y });


    if (this.isDrawing) {
      // --- Polygon live preview ---
      if (this.currentMode === 'draw-polygon' && this.drawnPoints.length > 0) {
        if (this.isPreviewPoint) {
          this.drawnPoints.pop();
        }

        // If shift is held, snap preview to first point
        if (event.shiftKey && this.drawnPoints.length > 0) {
          point = { ...this.drawnPoints[0] };
        }

        this.drawnPoints.push(point); // add preview point

        if (this.drawing)
          this.tempShape = buildPolygon(
            this.drawnPoints,
            this.drawing.style,
            this.drawing.transform);
        this.redraw();
        this.isPreviewPoint = true;
        return;
      }

      // --- 2-point shape preview ---
      this.drawnPoints.push(point);

      if (this.drawnPoints.length > 1) {
        switch (this.currentMode) {
          case 'draw-rect':
            if (this.drawing)
              this.tempShape = buildRectangle(
                this.drawnPoints[0],
                this.drawnPoints[1],
                this.drawing.style,
                this.drawing.transform);
            break;
          case 'draw-ellipse':
            if (this.drawing)
              this.tempShape = buildEllipseFromBox(
                this.drawnPoints[0],
                this.drawnPoints[1],
                this.drawing.style,
                this.drawing.transform);
            break;
          case 'draw-circle':
            if (this.drawing)
              this.tempShape = buildCircleFromBox(
                this.drawnPoints[0],
                this.drawnPoints[1],
                this.drawing.style,
                this.drawing.transform);
            break;
        }
      }

      this.redraw();
      this.drawnPoints.pop();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    // Only handle KeyboardEvent (safe in this case)
    if (event instanceof KeyboardEvent) {
      this.handleEscape();
    }
  }

  handleEscape() {
    // If drawing a polygon
    if (this.isDrawing && this.drawing) {
      if (this.currentMode === 'draw-polygon') {
        if (this.drawnPoints.length > 1) {
          // Remove the last permanent point (second-to-last in the array)
          this.drawnPoints.splice(this.drawnPoints.length - 2, 1);
          this.tempShape = buildPolygon(
            this.drawnPoints,
            this.drawing.style,
            this.drawing.transform);
          this.redraw();
          this.redraw();
          this.tempShape = null;
        }
      } else {
        // Only one point left—cancel polygon drawing
        this.drawnPoints = [];
        //this.tempShape = null;
        this.redraw();
      }
    }
  }

  setCommand(cmd: string) {
    this.currentMode = cmd;
    if (cmd != 'select')
      this.isDrawing = true;
  }

}
