/**
 * Simple debounce function
 * @param callback callback function
 * @param ms delay before executing function
 */
export const debounce = (callback: () => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), ms);
  };
};