export default function deepCopy<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => deepCopy(item)) as unknown as T;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.getOwnPropertyNames(value).reduce((obj, prop) => {
      obj[prop] = deepCopy((value as Record<string, unknown>)[prop]);
      return obj;
    }, Object.create(Object.getPrototypeOf(value)));
  }

  return value;
}
