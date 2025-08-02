import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'dd-headsup-display',
    templateUrl: './headsup-display.component.html',
    styleUrls: ['./headsup-display.component.scss'],
    imports: [ CommonModule ]
})
export class HeadsupDisplayComponent {
    visibleZones = {
        top: false,
        bottom: true,
        left: false,
        right: false
    };

    readonly zoneList: ('top' | 'bottom' | 'left' | 'right')[] = ['top', 'bottom', 'left', 'right'];
    @Input() command: string | null = 'select';
    draggingFrom: 'top' | 'bottom' | 'left' | 'right' | null = null;
    hoveredZone: 'top' | 'bottom' | 'left' | 'right' | null = null;

    brightness = 0;
    showBrightnessSlider = false;

    @Output() commandChange = new EventEmitter<string>();
    commandList = ['select', 'draw-rect', 'draw-circle', 'draw-ellipse', 'draw-polygon'];
    dropdownOpen = false;

    isDragging = false;
    private dragStartPoint: { x: number; y: number } | null = null;
    @Input() drawingBounds: DOMRect | null = null;

    get offsetStyles() {
        if (!this.drawingBounds) return {};

        const bounds = this.drawingBounds;
        return {
            '--hud-top': `${bounds.top + 12}px`,
            '--hud-left': `${bounds.left + 12}px`,
            '--hud-right': `${window.innerWidth - bounds.right + 12}px`,
            '--hud-bottom': `${window.innerHeight - bounds.bottom + 12}px`,
            '--hud-center-x': `${bounds.left + bounds.width / 2}px`,
            '--hud-center-y': `${bounds.top + bounds.height / 2}px`,
        };
    }

    setCommand(cmd: string) {
        this.commandChange.emit(cmd);
        this.dropdownOpen = false;
    }

    onBrightnessChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.brightness = +input.value;
        // You can later bind this to actual color updates
    }

    startDrag(zone: 'top' | 'bottom' | 'left' | 'right', event: MouseEvent) {
        if (this.command !== 'select') return;

        if (this.command !== 'select') return; // ✅ block if not select mode
        if (!this.visibleZones[zone]) return;
        this.draggingFrom = zone;
        this.dragStartPoint = { x: event.clientX, y: event.clientY };
        this.isDragging = false;
    }

    onZoneEnter(zone: 'top' | 'bottom' | 'left' | 'right') {
        if (this.draggingFrom && zone !== this.draggingFrom) {
            this.hoveredZone = zone;
        }
    }

    onZoneLeave(zone: 'top' | 'bottom' | 'left' | 'right') {
        if (this.hoveredZone === zone) {
            this.hoveredZone = null;
        }
    }

    @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const clickedInsideZone = target.closest('.zone, .brightness-slider, .command-dropdown');
  if (!clickedInsideZone) {
    this.dropdownOpen = false;
    this.showBrightnessSlider = false;
  }
}
    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (!this.draggingFrom || !this.dragStartPoint) return;

        const dx = event.clientX - this.dragStartPoint.x;
        const dy = event.clientY - this.dragStartPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (!this.isDragging && distance > 5) {
            this.isDragging = true;
        }
    }

    @HostListener('window:mouseup', ['$event'])
    onGlobalMouseUp(event: MouseEvent) {
        if (this.draggingFrom && this.hoveredZone && this.hoveredZone !== this.draggingFrom) {
            this.setVisibleZone(this.hoveredZone);
        }

        // ✅ Always reset dragging state
        this.isDragging = false;
        this.draggingFrom = null;
        this.dragStartPoint = null;
        this.hoveredZone = null;
    }

    private setVisibleZone(zone: 'top' | 'bottom' | 'left' | 'right') {
        for (const key in this.visibleZones) {
            this.visibleZones[key as keyof typeof this.visibleZones] = false;
        }
        this.visibleZones[zone] = true;
    }

    get activeZone(): 'top' | 'bottom' | 'left' | 'right' | null {
        return (['top', 'bottom', 'left', 'right'] as const).find(z => this.visibleZones[z]) ?? null;
    }

    get brightnessColor(): string {
        const value = this.brightness;
        return `hsl(0, 0%, ${value}%)`; // grayscale from black to white
    }
    toggleBrightnessSlider() {
        this.dropdownOpen = false;
        this.showBrightnessSlider = !this.showBrightnessSlider;
    }

    toggleDropdown() {
        this.showBrightnessSlider = false;
        this.dropdownOpen = !this.dropdownOpen;
    }

    // Stroke
strokeWidth = 2;
strokeColor = '#000000';
strokeOpacity = 100;

// Fill
fillEnabled = false;
fillColor = '#cccccc';

// Style
dashed = false;
capStyle: 'butt' | 'round' | 'square' = 'butt';

onStrokeWidthChange(event: Event) {
  this.strokeWidth = +(event.target as HTMLInputElement).value;
}
onStrokeColorChange(event: Event) {
  this.strokeColor = (event.target as HTMLInputElement).value;
}
onStrokeOpacityChange(event: Event) {
  this.strokeOpacity = +(event.target as HTMLInputElement).value;
}
onFillColorChange(event: Event) {
  this.fillColor = (event.target as HTMLInputElement).value;
}

}
