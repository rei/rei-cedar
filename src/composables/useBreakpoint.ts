import { ref, onMounted, onBeforeUnmount } from 'vue';
import { CdrBreakpointSm, CdrBreakpointMd, CdrBreakpointLg } from '@rei/cdr-tokens';

/**
 * Gets the current breakpoint based on window width
 * @returns The current breakpoint name ('xs', 'sm', 'md', or 'lg')
 */
export function getCurrentBreakpoint(): string {
  const screenWidth = (window && window.innerWidth) || 0;
  if (screenWidth >= +CdrBreakpointSm && screenWidth < +CdrBreakpointMd) {
    return 'sm';
  }
  if (screenWidth >= +CdrBreakpointMd && screenWidth < +CdrBreakpointLg) {
    return 'md';
  }
  if (screenWidth >= +CdrBreakpointLg) {
    return 'lg';
  }

  return 'xs';
}

/**
 * Composable for reactive breakpoint detection
 * Returns a reactive reference to the current breakpoint that updates on window resize
 * 
 * @example
 * ```ts
 * const breakpoint = useBreakpoint();
 * // breakpoint.value will be 'xs', 'sm', 'md', or 'lg'
 * ```
 */
export function useBreakpoint() {
  const breakpoint = ref<string>(getCurrentBreakpoint());

  const updateBreakpoint = () => {
    breakpoint.value = getCurrentBreakpoint();
  };

  onMounted(() => {
    window.addEventListener('resize', updateBreakpoint);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateBreakpoint);
  });

  return breakpoint;
}

// Default export for backward compatibility
export default getCurrentBreakpoint;
