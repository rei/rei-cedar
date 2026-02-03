/**
 * CdrTable component properties
 * Organizes structured data for users to easily scan, compare, and analyze
 */
export type CdrTableProps = {
  /** Sets row colors to alternate between darker and lighter backgrounds. Striping will not apply when border is true */
  striped?: boolean;
  /** Adds borders between rows. Will disable striped if both are true */
  border?: boolean;
  /** Sets the width to 100%. Also accepts space separated strings for breakpoints */
  fullWidth?: boolean | string;
  /** Makes the table scroll horizontally when it would overflow its container */
  responsive?: boolean;
  /** Adds a darker background on row hover */
  hover?: boolean;
  /** Sets the table size (cell padding); values can target responsive breakpoints */
  size?: string;
};
