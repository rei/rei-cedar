/**
 * Quickly generates a unique id string.
 */

export default function generateUid() {
  const uid = Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
  return `cdr-id-${uid}`;
}
