import  { type InjectionKey, type Ref } from "vue";

/** Skeleton injection key */
export const motionKey: InjectionKey<Ref<boolean>> = Symbol();

/** Tabs injection key */
export const selectedTabKey: InjectionKey<Ref<string | null>> = Symbol();

/** Toggle button injection key */
export const selectedToggleKey:
  InjectionKey<Ref<string | number | boolean | Record<string, any> | unknown[]>>
  = Symbol();

/** Accordion injection keys */ 
export const unwrappedKey: InjectionKey<Ref<boolean>> = Symbol();
  