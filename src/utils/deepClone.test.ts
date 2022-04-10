import deepClone from './deepClone';

describe('deepClone', () => {
  test('creates a different instance of a given object', () => {
    const original = { id: 1, name: 'A' };
    const cloned = deepClone(original);

    expect(cloned).not.toBe(original);
  });

  test('creates a deep copy of a given object', () => {
    const original = {
      id: 1,
      name: 'John Doe',
      birthDate: new Date(),
      adresses: [{ name: 'Address 1' }, { name: 'Address 2' }],
    };
    const cloned = deepClone(original);

    cloned.id = 2;
    cloned.birthDate.setMonth(original.birthDate.getMonth() + 1);
    cloned.adresses[0].name = 'Address 3';

    expect(cloned.name).toEqual(original.name);
    expect(cloned.id).not.toEqual(original.id);
    expect(cloned.birthDate).not.toEqual(original.birthDate);
    expect(cloned.adresses[0].name).not.toEqual(original.adresses[0].name);
  });

  test('clones an empty array', () => {
    const original: string[] = [];
    const cloned = deepClone(original);

    original.push('foo');

    expect(cloned).toHaveLength(0);
  });

  test('clones a nested array', () => {
    const original = [['foo']];
    const cloned = deepClone(original);

    original[0].push('bar');

    expect(original[0].length).not.toEqual(cloned[0].length);
  });
});
