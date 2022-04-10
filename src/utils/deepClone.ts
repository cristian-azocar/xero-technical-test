/**
 * Creates a new object that is a copy of the given object.
 * @param value The object to be cloned.
 * @returns A new object that is a copy of the given object.
 */
export default function deepClone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as unknown as T;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.getOwnPropertyNames(value).reduce((obj, prop) => {
      obj[prop] = deepClone((value as Record<string, unknown>)[prop]);
      return obj;
    }, Object.create(Object.getPrototypeOf(value)));
  }

  return value;
}
