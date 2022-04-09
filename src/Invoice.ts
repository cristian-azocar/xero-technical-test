import InvoiceLine from './InvoiceLine';
import deepCopy from './utils/deepCopy';

export default class Invoice {
  invoiceDate: Date;
  invoiceNumber: string;
  lineItems: InvoiceLine[];

  constructor(
    invoiceDate = new Date(),
    invoiceNumber = '',
    lineItems: InvoiceLine[] = []
  ) {
    this.invoiceDate = invoiceDate;
    this.invoiceNumber = invoiceNumber;
    this.lineItems = lineItems;
  }

  addLine(line: InvoiceLine): void {
    const existingLine = this.getLineById(line.id);

    if (existingLine) {
      existingLine.quantity += line.quantity;
    } else {
      this.lineItems.push(line);
    }
  }

  removeLine(id: number): void {
    this.lineItems = this.lineItems.filter((item) => item.id !== id);
  }

  getLineById(id: number): InvoiceLine | undefined {
    return this.lineItems.find((item) => item.id === id);
  }

  getTotal(): number {
    return this.lineItems.reduce(
      (accumulator, item) => accumulator + item.getTotal(),
      0
    );
  }

  merge(invoice: Invoice): void {
    invoice.lineItems.forEach((line) => {
      const existingLine = this.getLineById(line.id);
      if (existingLine) {
        existingLine.quantity += line.quantity;
      } else {
        this.lineItems.push(line.clone());
      }
    });
  }

  clone(): Invoice {
    return deepCopy(this);
  }

  toString(): string {
    const separator = '-'.repeat(25);
    const itemsString = this.lineItems.reduce((accumulator, item) => {
      return `${accumulator}${item.toString()}${separator}\n`;
    }, '');

    return [
      '',
      separator,
      `Date: ${this.invoiceDate.toDateString()}`,
      `Invoice #: ${this.invoiceNumber}`,
      separator,
      itemsString,
      `Total: $${this.getTotal()}`,
      '',
    ].join('\n');
  }
}
