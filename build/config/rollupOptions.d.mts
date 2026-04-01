import type { BuildEnvironmentOptions } from 'vite';

declare const options: NonNullable<BuildEnvironmentOptions['rolldownOptions']>;

export default options;
