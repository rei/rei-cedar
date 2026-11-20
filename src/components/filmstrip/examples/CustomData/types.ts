/**
 * Your custom data model structure.
 * This represents the data shape your application uses.
 */
export interface CustomModel {
  title: string;
  items: CustomItem[];
}

export interface CustomItem {
  id: number;
  name: string;
  value: number;
}
