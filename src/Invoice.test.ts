import Invoice from './Invoice';
import InvoiceLine from './InvoiceLine';

describe('Invoice', () => {
  test('creates an instance with default values', () => {
    const invoice = new Invoice();

    expect(invoice.invoiceDate).toBeInstanceOf(Date);
    expect(invoice.invoiceNumber).toEqual('');
    expect(invoice.lineItems).toHaveLength(0);
  });

  test('creates an instance with given values', () => {
    const invoiceDate = new Date();
    const invoiceNumber = '1000';
    const lineItems = [
      new InvoiceLine(1, 10, 3, 'Apple'),
      new InvoiceLine(1, 10, 3, 'Apple'),
      new InvoiceLine(2, 12.5, 1, 'Orange'),
    ];
    const invoice = new Invoice(invoiceDate, invoiceNumber, lineItems);

    expect(invoice.invoiceDate).toEqual(invoiceDate);
    expect(invoice.invoiceNumber).toEqual(invoiceNumber);
    expect(invoice.lineItems).toHaveLength(2);
  });

  test('adds a single line', () => {
    const invoice = new Invoice();

    invoice.addLine(new InvoiceLine(1, 10, 5, 'Apple'));

    expect(invoice.lineItems).toHaveLength(1);
  });

  test('adds multiple lines', () => {
    const invoice = new Invoice();

    invoice.addLines([
      new InvoiceLine(1, 10, 5, 'Apple'),
      new InvoiceLine(2, 12.5, 2, 'Orange'),
      new InvoiceLine(3, 11.34, 2, 'Pineapple'),
    ]);

    expect(invoice.lineItems).toHaveLength(3);
  });

  test('increments the quantity of a line if it already exists', () => {
    const invoice = new Invoice();

    invoice.addLine(new InvoiceLine(1, 10, 5, 'Apple'));
    invoice.addLine(new InvoiceLine(2, 12.5, 2, 'Orange'));
    invoice.addLine(new InvoiceLine(2, 11.34, 3, 'Orange'));

    expect(invoice.lineItems).toHaveLength(2);
    expect(invoice.lineItems[1].quantity).toEqual(5);
  });

  test('removes a line', () => {
    const invoice = new Invoice();

    invoice.addLine(new InvoiceLine(1, 10.12, 5, 'Apple'));
    invoice.addLine(new InvoiceLine(2, 12.57, 2, 'Orange'));
    invoice.removeLine(1);

    expect(invoice.lineItems).toHaveLength(1);
    expect(invoice.lineItems[0].id).toEqual(2);
  });

  test('returns a line by a given ID', () => {
    const invoice = new Invoice();

    invoice.addLine(new InvoiceLine(1, 10.12, 5, 'Apple'));
    invoice.addLine(new InvoiceLine(2, 12.57, 2, 'Orange'));
    const line = invoice.getLineById(2);

    expect(line).toBeInstanceOf(InvoiceLine);
    expect(line?.id).toEqual(2);
  });

  test('returns the total value', () => {
    const lines = [
      new InvoiceLine(1, 10, 1, 'Apple'),
      new InvoiceLine(2, 12.5, 1, 'Orange'),
      new InvoiceLine(3, 8.99, 1, 'Pineapple'),
    ];
    const invoice = new Invoice();

    invoice.addLines(lines);

    const total = lines.reduce((acc, line) => acc + line.getTotal(), 0);

    expect(invoice.getTotal()).toEqual(total);
  });

  test('merges two invoices', () => {
    const invoice1 = new Invoice();
    const invoice2 = new Invoice();

    invoice1.addLine(new InvoiceLine(1, 10, 1, 'Apple'));
    invoice2.addLine(new InvoiceLine(1, 10, 3, 'Apple'));
    invoice2.addLine(new InvoiceLine(2, 12.5, 1, 'Orange'));
    invoice2.addLine(new InvoiceLine(3, 8.99, 1, 'Pineapple'));

    invoice1.merge(invoice2);

    expect(invoice1.lineItems).toHaveLength(3);
    expect(invoice1.lineItems[0].id).toEqual(1);
    expect(invoice1.lineItems[1].id).toEqual(2);
    expect(invoice1.lineItems[2].id).toEqual(3);
    expect(invoice1.lineItems[0].quantity).toEqual(4);
  });

  test('returns a deep clone', () => {
    const invoice = new Invoice();
    const cloned = invoice.clone();

    expect(cloned).not.toBe(invoice);
  });

  test('returns a string that represents the object', () => {
    const invoice = new Invoice();
    const str = invoice.toString();

    expect(str.length).toBeGreaterThan(0);
  });
});
