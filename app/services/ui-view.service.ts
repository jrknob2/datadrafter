/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentInjector, Injectable } from '@angular/core';
import { ViewDescriptor, VIEW_MAP } from '../elastic-layout/view-map';
import { INPUT_RESOLVERS } from './../dynamic-forms/input-registry';
import { ParamMap } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UIViewService {
  private _view: (ViewDescriptor & {
    context: { inputs?: Record<string, any> };
    workspace: { inputs?: Record<string, any> };
  }) | null = null;

  get view() {
    if (!this._view) throw new Error('[UIViewService] view is not set');
    return this._view;
  }

  async setView(
    viewKey: string,
    queryParams: ParamMap,
    injector: EnvironmentInjector
  ): Promise<void> {
    const base = VIEW_MAP[viewKey];
    if (!base) throw new Error(`[UIViewService] Unknown view key: ${viewKey}`);

    const resolver = INPUT_RESOLVERS[viewKey];
    const inputs = resolver ? await resolver(queryParams, injector) : {};

    this._view = {
      context: {
        component: base.context.component,
        inputs
      },
      workspace: {
        component: base.workspace.component,
        inputs
      }
    };
  }
}
