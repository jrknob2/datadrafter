import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModelerStateService {
  selectedTypeUuid = signal<string | null>(null);
}
