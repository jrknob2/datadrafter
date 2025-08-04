/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ObjectTypesService } from '../../apps/modeler/services/object-types.service';

export type InputResolver = (
  params: ParamMap,
  injector: EnvironmentInjector
) => Promise<Record<string, any>>;

export const INPUT_RESOLVERS: Record<string, InputResolver> = {
  'object-types-form': async (params, injector) =>
    await runInInjectionContext(injector, async () => {
      const uuid = params.get('uuid');
      const mode = params.get('mode') ?? 'view';
      if (!uuid) throw new Error('[INPUT_RESOLVERS] Missing "uuid"');

      const service = injector.get(ObjectTypesService);
      const model = await service.getOne(uuid);
      if (!model) {
        console.warn(`[INPUT_RESOLVERS] ObjectType not found for uuid: ${uuid}`);
      }
      return { model, mode };
    })
};
