import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DrawingCommand =
  | 'select'
  | 'draw-rect'
  | 'draw-circle'
  | 'draw-ellipse'
  | 'draw-polygon'
  | 'delete';

@Injectable({ providedIn: 'root' })
export class CommandService {
  private commandSubject = new BehaviorSubject<DrawingCommand>('select');
  public command$ = this.commandSubject.asObservable();

  execute(cmd: DrawingCommand) {
    this.commandSubject.next(cmd);
  }

  // <-- Add this getter:
  get currentCommand(): DrawingCommand {
    return this.commandSubject.getValue();
  }
}
