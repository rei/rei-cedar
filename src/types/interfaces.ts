/**
 * Breadcrumb data object
 * 
 * @interface breadcrumbItem
 * @url {string} The url for the breadcrumb link
 * @name {string} The display name for breadcrumb link
 * @id {string} Optional id
 */
export interface breadcrumbItem {
  item: {
    url: string,
    name: string,
    id?: string,
  }
}

/**
 * Pagination data object
 * 
 * @interface paginationItem
 * @page {number} The page number, also used as link text
 * @url {string} The url for the pagination link
 * @ellip {boolean} Optional flag to render pagination to truncate pagination links
 */
export interface paginationItem {
  page: number,
  url: string,
  ellip?: boolean
}

/**
 * Select data object
 * 
 * @interface selectOption
 * @text {string} The displayed option
 * @value {string} The underlying value for the option
 */
export interface selectOption {
  text: string,
  value: string,
}