/**
 * Creates a debounced function that delays invoking the callback until after
 * the specified wait time has elapsed since the last time it was invoked.
 *
 * Useful for limiting the rate at which a function is executed, particularly
 * for expensive operations like API calls, DOM updates, or event handlers.
 *
 * @param callback - The function to debounce
 * @param ms - The number of milliseconds to delay (default: 300ms)
 * @returns A debounced version of the callback function
 *
 * @example
 * const handleSearch = debounce((query: string) => {
 *   fetchResults(query);
 * }, 500);
 *
 * // Will only execute once after user stops typing for 500ms
 * input.addEventListener('input', (e) => handleSearch(e.target.value));
 *
 * @example
 * const handleResize = debounce(() => {
 *   updateLayout();
 * }, 200);
 *
 * window.addEventListener('resize', handleResize);
 */
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  ms = 300,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), ms);
  };
};
