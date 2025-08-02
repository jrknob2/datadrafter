/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, signal } from '@angular/core';
import { Drawing } from '../../../app/models/Drawing';
import { Shape } from '../../../app/models/Shape';

@Injectable({ providedIn: 'root' })
export class DesignerStateService {
  mouseTracker = signal<any>(null);
  drawing = signal<Drawing | null>(null);
  selectedShape = signal<Shape | null>(null);
}
