import { useCssModule, computed } from "vue";
/**
 * Common star component setup logic
 * @param size size property passed to component
 */
export function useStar(size: string) {
  const style = useCssModule();
  const baseClass = 'cdr-rating';
  const sizeClass = computed(() => size ? `${baseClass}__star--${size}` : '');

  return { style, sizeClass };
}