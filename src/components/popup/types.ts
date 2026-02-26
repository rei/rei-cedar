/**
 * CdrPopup component properties (internal helper component)
 */
export type CdrPopupProps = {
  /** Whether the popup is opened */
  opened?: boolean;
  /** Sets the position where the popup will render */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** If set to true, popup will attempt to dynamically set its position */
  autoPosition?: boolean;
  /** Add custom class to the popup content wrapper */
  contentClass?: string;
};
