import CliTable from 'cli-table';
import InvoiceLine from './InvoiceLine';
import deepClone from '../utils/deepClone';

/**
 * Represents an invoice.
 */
export default class Invoice {
  /** The date the invoice was issued. */
  invoiceDate: Date;
  /** The number of the invoice. */
  invoiceNumber: string;
  /** The items of the invoice. */
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

  /**
   * Creates a new instance of the Invoice class.
   * @param invoiceDate The date the invoice was issued.
   * @param invoiceNumber The number of the invoice.
   * @param lineItems The items of the invoice.
   */
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

  /**
   * Appends a new invoice line or merges the quantity if it already exists.
   * @param line The invoice line to add.
   */
  addLine(line: InvoiceLine): void {
    const existingLine = this.getLineById(line.id);

    if (existingLine) {
      existingLine.quantity += line.quantity;
    } else {
      this.lineItems.push(line);
    }
  }

  /**
   * Appends new invoice lines or merges the quantities if they already exists.
   * @param lines The invoice lines to add.
   */
  addLines(lines: InvoiceLine[]): void {
    lines.forEach((line) => this.addLine(line));
  }

  /**
   * Removes a line.
   * @param id The ID of the line to remove.
   */
  removeLine(id: number): void {
    this.lineItems = this.lineItems.filter((line) => line.id !== id);
  }

  /**
   * Returns the first line that matches the ID.
   * @param id The ID of the line to find.
   * @returns The found line or otherwise, undefined.
   */
  getLineById(id: number): InvoiceLine | undefined {
    return this.lineItems.find((line) => line.id === id);
  }

  /**
   * Returns the total value.
   * @returns The total value.
   */
  getTotal(): number {
    return this.lineItems.reduce(
      (accumulator, line) => accumulator + line.getTotal(),
      0
    );
  }

  /**
   * Merges the specified Invoice with the current instance.
   * @param invoice The invoice to be merged.
   */
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

  /**
   * Creates a new object that is a deep copy of the current instance.
   * @returns A new object that is a copy of this instance.
   */
  clone(): Invoice {
    return deepClone(this);
  }

  /**
   * Returns a string that represents the current instance.
   * @returns A string that represents the current instance.
   */
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
