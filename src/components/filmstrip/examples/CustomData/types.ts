/**
 * What is a data model?
 * 
 * A data model is the structure of data your application uses.
 * For example, your app might have products with IDs, names, and prices.
 * This is the shape of data that comes from your API or database.
 * 
 * Why do we need an adapter?
 * 
 * Cedar Filmstrip expects data in a specific format (frames).
 * Your app's data likely has a different format.
 * The adapter translates your data format into Cedar's format.
 * 
 * Example:
 * Your data: { id: 1, name: "Product A", price: 100 }
 * Cedar needs: { key: "1", props: { name: "Product A", price: 100 } }
 * 
 * The adapter does this translation.
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
