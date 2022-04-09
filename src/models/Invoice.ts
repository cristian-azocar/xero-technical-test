import CliTable from 'cli-table';
import InvoiceLine from './InvoiceLine';
import deepCopy from '../utils/deepCopy';

export default class Invoice {
  invoiceDate: Date;
  invoiceNumber: string;
  lineItems: InvoiceLine[];

  private table = new CliTable({
    head: ['Item', 'Qty', 'Cost', 'Total'],
    chars: {
      top: '-',
      middle: ' ',
      bottom: '-',
      mid: '-',
      'top-mid': '-',
      'bottom-mid': '-',
      'mid-mid': '-',
    },
  });

  constructor(
    invoiceDate = new Date(),
    invoiceNumber = '',
    lineItems: InvoiceLine[] = []
  ) {
    this.invoiceDate = invoiceDate;
    this.invoiceNumber = invoiceNumber;
    this.lineItems = [];

    lineItems.forEach((line) => this.addLine(line));
  }

  addLine(line: InvoiceLine): void {
    const existingLine = this.getLineById(line.id);

    if (existingLine) {
      existingLine.quantity += line.quantity;
    } else {
      this.lineItems.push(line);
    }
  }

  addLines(lines: InvoiceLine[]): void {
    lines.forEach((line) => this.addLine(line));
  }

  removeLine(id: number): void {
    this.lineItems = this.lineItems.filter((line) => line.id !== id);
  }

  getLineById(id: number): InvoiceLine | undefined {
    return this.lineItems.find((line) => line.id === id);
  }

  getTotal(): number {
    return this.lineItems.reduce(
      (accumulator, line) => accumulator + line.getTotal(),
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
    this.table.length = 0;
    this.lineItems.forEach((line) => {
      this.table.push([
        line.description,
        line.quantity,
        `$${line.cost}`,
        `$${line.getTotal().toFixed(2)}`,
      ]);
    });

    this.table.push(['', '', 'Total', `$${this.getTotal().toFixed(2)}`]);

    return this.table.toString();
  }
}
