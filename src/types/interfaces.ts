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