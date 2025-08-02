import {
  Component,
  ViewChild,
  ViewContainerRef,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContextToolbarComponent } from './components/context-toolbar/context-toolbar.component';
import { HeaderPanelComponent } from './components/header-panel/header-panel.component';
import { UIViewService } from '../services/ui-view.service';
import { EnvironmentInjector } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dd-elastic-layout',
  imports: [
    CommonModule,
    ContextToolbarComponent,
    HeaderPanelComponent],
  templateUrl: './elastic-layout.component.html',
  styleUrls: ['./elastic-layout.component.scss']
})
export class ElasticLayoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private viewService = inject(UIViewService);
  private injector = inject(EnvironmentInjector);

  @ViewChild('dynamicContext', { read: ViewContainerRef, static: true })
  contextRef!: ViewContainerRef;

  @ViewChild('dynamicWorkspace', { read: ViewContainerRef, static: true })
  workspaceRef!: ViewContainerRef;

  async ngOnInit(): Promise<void> {
    const params = await firstValueFrom(this.route.queryParamMap);
    const viewKey = params.get('view') ?? 'designer-dashboard';
    const queryParams = this.route.snapshot.queryParamMap;
    await this.viewService.setView(viewKey, queryParams, this.injector);
    this.loadRoutedComponents();
  }

  private async loadRoutedComponents() {
    const routeData = this.route.snapshot.data;

    const contextComp = await routeData.contextComponent();
    const workspaceComp = await routeData.workspaceComponent();

    this.contextRef.clear();
    this.workspaceRef.clear();

    const context = this.viewService.view.context;
    const workspace = this.viewService.view.workspace;

    const ctxRef = this.contextRef.createComponent(contextComp, {
      injector: this.injector
    });
    Object.entries(context.inputs || {}).forEach(([key, value]) => {
      ctxRef.setInput?.(key, value);
    });

    const wsRef = this.workspaceRef.createComponent(workspaceComp, {
      injector: this.injector
    });
    Object.entries(workspace.inputs || {}).forEach(([key, value]) => {
      wsRef.setInput?.(key, value);
    });
  }
}
