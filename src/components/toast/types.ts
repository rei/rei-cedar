/**
 * CdrToast component properties
 * Non-modal dialog used to communicate the status of a task or process
 */
export type CdrToastProps = {
  /** Sets the toast type */
  type?: 'info' | 'warning' | 'success' | 'error' | 'default';
  /** Used to programmatically control the toast open/close state */
  open?: boolean;
  /** Set to false to disable automatic closing after the dismissDelay */
  autoDismiss?: boolean;
  /** Sets the interval (in milliseconds) before the toast automatically closes */
  dismissDelay?: number;
};
