/**
 * CdrTabs component properties
 * Organizes related content into groups for people to navigate between
 */
export type CdrTabsProps = {
  /** Sets height of the tabs container element */
  height?: string;
  /** Sets the index of the tab that should be active on initial page load. Note that this property is zero-indexed */
  activeTab?: number;
  /** Modifies the style variants for this component */
  modifier?: string;
  /** Use small to reduce spacing around the tabs for a denser visual design */
  size?: string;
  /** Sets the background color of the tab. For CdrTabs that are rendered on non-primary backgrounds */
  backgroundColor?: string;
};

/**
 * CdrTabPanel component properties
 * Individual tab panel content container
 */
export type CdrTabPanelProps = {
  /** Sets reference identifier for tab content. Required for accessibility */
  id?: string;
  /** Sets tab display name. Required and must be unique for each tab */
  name?: string;
  /** Sets reference identifier for tab header. Required for accessibility */
  ariaLabelledby?: string;
};
