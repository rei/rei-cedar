import type { InjectionKey } from "vue";
import type { Ref } from 'vue'

export const selectedToggleKey:
  InjectionKey<Ref<string | number | boolean | Record<string, any> | unknown[]>>
  = Symbol();
