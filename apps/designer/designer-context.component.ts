/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  ViewChild,
  ViewContainerRef,
  Injector,
  EnvironmentInjector,
  ComponentRef,
  inject,
  AfterViewInit,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIViewService } from '../../app/services/ui-view.service';

@Component({
  standalone: true,
  selector: 'dd-designer-context',
  imports: [CommonModule],
  template: `<ng-container #dynamic></ng-container>`,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class DesignerContextComponent implements AfterViewInit {
  @ViewChild('dynamic', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  @Input() model: any;
  @Input() mode: 'view' | 'edit' | 'create' = 'view';


  private viewService = inject(UIViewService);
  private injector = inject(Injector);
  private envInjector = inject(EnvironmentInjector);
  private componentRef?: ComponentRef<unknown>;

  ngAfterViewInit(): void {
    this.envInjector.runInContext(() => {
      const { component, inputs } = this.viewService.view.context;
      this.viewContainerRef.clear();
      this.componentRef = this.viewContainerRef.createComponent(component, {
        injector: this.injector
      });

      if (inputs) {
        Object.entries(inputs).forEach(([key, value]) => {
          this.componentRef?.setInput?.(key, value);
        });
      }
    });
  }
}
