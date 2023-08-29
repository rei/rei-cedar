import type { InjectionKey } from "vue";
import type { Ref } from 'vue'

export const selectedTabKey: InjectionKey<Ref<string | null>> = Symbol();
