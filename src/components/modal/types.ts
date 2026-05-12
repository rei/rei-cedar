import type { ModalRole } from '../../types/componentOptions';

/**
 * CdrModal component properties
 */
export type CdrModalProps = {
  /** Toggles the state of the modal */
  opened: boolean;
  /** Sets `aria-label` and modal title text. Can also use title slot to set title. */
  label: string;
  /** Toggles the modal title text, which comes from `label` prop or `title` slot. */
  showTitle?: boolean;
  /** Text for aria-describedby attribute. Applied to modal content element */
  ariaDescribedby?: string | null;
  /** Sets the `role` attribute on the modal content element */
  role?: ModalRole;
  /** Sets unique `id` for modal */
  id?: string | null;
  /** Adds custom class to the `cdr-modal__overlay` div */
  overlayClass?: string;
  /** Adds custom class to the `cdr-modal__outerWrap` div */
  wrapperClass?: string;
  /** Adds custom class to the `cdr-modal__innerWrap` div */
  contentClass?: string;
  /** Sets duration for modal's close animation */
  animationDuration?: number;
};
