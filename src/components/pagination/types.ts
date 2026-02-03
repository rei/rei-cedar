/**
 * Pagination navigation item data structure
 */
export interface PaginationItem {
  /** The page number, also used as link text */
  page: number;
  /** The URL for the pagination link */
  url: string;
  /** Optional flag to render an ellipsis for truncated pagination */
  ellip?: boolean;
}

/**
 * CdrPagination component properties
 */
export type CdrPaginationProps = {
  /** Define a custom slug for the generated pagination item IDs */
  id?: string;
  /** Sets the total number of pages for displaying "Page x of <totalPages>" */
  totalPages?: number | null;
  /** Array of objects containing pagination data */
  pages: PaginationItem[];
  /** Sets which tag type is used to render pagination elements */
  linkTag?: 'a' | 'button';
  /** Used to customize the aria-label for the root pagination element */
  forLabel?: string;
  /** Used for binding v-model, represents the current page */
  modelValue?: number;
};
