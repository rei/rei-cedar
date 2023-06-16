import type { InjectionKey } from "vue";
import type { Ref } from 'vue'

export const unwrappedKey: InjectionKey<Ref<boolean>> = Symbol();

export const groupedKey: InjectionKey<Ref<boolean>> = Symbol();
