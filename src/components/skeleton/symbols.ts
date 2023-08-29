import type { InjectionKey } from "vue";
import type { Ref } from 'vue'

export const motionKey: InjectionKey<Ref<boolean>> = Symbol();
