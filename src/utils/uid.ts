/**
 * Generates a unique identifier string with a 'cdr-id-' prefix.
 *
 * Creates a random hexadecimal ID that can be used for component instance
 * identification, ARIA attributes, or any scenario requiring unique IDs.
 *
 * Note: This uses Math.random() and is suitable for client-side uniqueness
 * but should not be used for cryptographic purposes or guaranteed global uniqueness.
 *
 * @returns A unique ID string in the format 'cdr-id-{hex}'
 *
 * @example
 * generateUid() // => 'cdr-id-a3f2b9'
 * generateUid() // => 'cdr-id-7d4c1e'
 *
 * @example
 * // Using in a component for accessibility
 * const inputId = generateUid();
 * // <label :for="inputId">Name</label>
 * // <input :id="inputId" />
 */
export default function generateUid(): string {
  const uid = Math.floor((1 + Math.random()) * 0x1000000)
    .toString(16)
    .substring(1);
  return `cdr-id-${uid}`;
}
