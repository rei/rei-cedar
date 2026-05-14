/**
 * Breadcrumb navigation item data structure
 */
export interface BreadcrumbItem {
  item: {
    /** The URL for the breadcrumb link */
    url: string;
    /** The display name for the breadcrumb link */
    name: string;
    /** Optional unique identifier */
    id?: string;
  };
}

/**
 * CdrBreadcrumb component properties
 */
export type CdrBreadcrumbProps = {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Enables truncation of breadcrumb items */
  truncationEnabled?: boolean;
  /** Unique id for the breadcrumb */
  id?: string;
};
