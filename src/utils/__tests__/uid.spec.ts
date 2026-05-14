import generateUid from '../uid';

describe('generateUid', () => {
  it('generates a string with cdr-id prefix', () => {
    const uid = generateUid();
    expect(uid).toMatch(/^cdr-id-/);
  });

  it('generates unique IDs on each call', () => {
    const uid1 = generateUid();
    const uid2 = generateUid();
    const uid3 = generateUid();

    expect(uid1).not.toBe(uid2);
    expect(uid2).not.toBe(uid3);
    expect(uid1).not.toBe(uid3);
  });

  it('generates IDs with hexadecimal characters', () => {
    const uid = generateUid();
    const hexPart = uid.replace('cdr-id-', '');
    expect(hexPart).toMatch(/^[0-9a-f]+$/);
  });

  it('generates IDs with consistent length', () => {
    const uid1 = generateUid();
    const uid2 = generateUid();
    const uid3 = generateUid();

    expect(uid1.length).toBe(uid2.length);
    expect(uid2.length).toBe(uid3.length);
  });

  it('generates many unique IDs', () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i++) {
      ids.add(generateUid());
    }
    expect(ids.size).toBe(1000);
  });
});
