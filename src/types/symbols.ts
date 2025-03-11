import { type InjectionKey, type Ref } from 'vue';
import { CdrFilmstripEventEmitter } from './interfaces';

/** Skeleton injection key */
export const motionKey: InjectionKey<Ref<boolean>> = Symbol();

/** Tabs injection key */
export const selectedTabKey: InjectionKey<Ref<string | null>> = Symbol();

/** Toggle button injection key */
export const selectedToggleKey: InjectionKey<
  Ref<string | number | boolean | Record<string, any> | unknown[]>
> = Symbol();

/** Accordion injection keys */
export const unwrappedKey: InjectionKey<Ref<boolean>> = Symbol();

/**
 * Injection key for providing a `FilmstripEventEmitter` instance via Vue's dependency injection system.
 *
 * This key is used to enable event communication within the filmstrip component tree,
 * allowing child components to emit events without requiring direct parent-child communication.
 *
 * @type {InjectionKey<CdrFilmstripEventEmitter>}
 */
export const CdrFilmstripEventKey: InjectionKey<CdrFilmstripEventEmitter> = Symbol(
  'CdrFilmstripEventEmitter',
);
