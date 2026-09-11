import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token, literal } from '../../../build/component-tokens/types';

/** Image scrims use neutral foundation colors. CSS owns the fade and opacity. */
const contract: ComponentTokenContract = {
  component: 'cdr-object-overlay',
  prefix: '--cdr-object-overlay',
  defaults: {
    'dark-stop': semantic('surface-neutral-intense', literal('black')),
    'light-stop': semantic('surface-neutral-trace', literal('white')),
    'light-midpoint': semantic('surface-neutral-trace', token('cdr-color-background-primary')),
  },
  variants: {},
};
export default contract;
