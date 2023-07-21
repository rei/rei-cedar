/* eslint-env browser */
const transitions = {
  transition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd otransitionend',
};

let transitionEvent: string;
if (typeof document !== 'undefined') {
  const { style } = document.createElement('div');
  const keys = Object.keys(transitions);
  for (let i = 0, key = keys[i]; i < keys.length; i += 1, key = keys[i]) {
    if (key in style) {
      transitionEvent = transitions[key as keyof typeof transitions];
      break;
    }
  }
}

export default (element: HTMLDivElement | null, callback: () => void, timeout: number) => {
  if (!element) return;
  element.addEventListener(transitionEvent, callback);
  let timeoutId: ReturnType<typeof setTimeout>;
  if (timeout) {
    timeoutId = setTimeout(
      () => {
        element.removeEventListener(transitionEvent, callback);
        callback();
      },
      timeout,
    );
  }
  return () => {
    clearTimeout(timeoutId);
    element.removeEventListener(transitionEvent, callback);
  };
};
