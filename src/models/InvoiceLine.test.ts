import InvoiceLine from './InvoiceLine';

describe('InvoiceLine', () => {
  test('creates an instance using the constructor values', () => {
    const id = 1;
    const cost = 15.35;
    const quantity = 3;
    const description = 'Apple';
    const invoiceLine = new InvoiceLine(id, cost, quantity, description);

    expect(invoiceLine.id).toEqual(id);
    expect(invoiceLine.cost).toEqual(cost);
    expect(invoiceLine.quantity).toEqual(quantity);
    expect(invoiceLine.description).toEqual(description);
  });

  test('returns the total value', () => {
    const cost = 15.35;
    const quantity = 3;
    const invoiceLine = new InvoiceLine(1, cost, quantity, 'Apple');

    expect(invoiceLine.getTotal()).toEqual(cost * quantity);
  });

  test('returns a deep clone', () => {
    const invoiceLine = new InvoiceLine(1, 15.32, 4, 'Apple');
    const cloned = invoiceLine.clone();

    expect(cloned).not.toBe(invoiceLine);
  });

  test('returns a string that represents the object', () => {
    const invoiceLine = new InvoiceLine(1, 15.32, 4, 'Apple');
    const str = invoiceLine.toString();

    expect(str.length).toBeGreaterThan(0);
  });
});
