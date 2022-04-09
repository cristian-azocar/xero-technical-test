import Invoice from './models/Invoice';
import InvoiceLine from './models/InvoiceLine';

function main(): void {
  console.log('Welcome to Xero Tech Test!');

  createInvoiceWithOneItem();
  createInvoiceWithMultipleItemsAndQuantities();
  removeItem();
  mergeInvoices();
  cloneInvoice();
  invoiceToString();
}

function createInvoiceWithOneItem(): void {
  const invoice = new Invoice();
  invoice.addLine(new InvoiceLine(1, 6.99, 1, 'Apple'));
  console.log(invoice.lineItems);
}

function createInvoiceWithMultipleItemsAndQuantities(): void {
  const invoice = new Invoice();

  invoice.addLine(new InvoiceLine(1, 10.21, 4, 'Banana'));
  invoice.addLine(new InvoiceLine(2, 5.21, 1, 'Orange'));
  invoice.addLine(new InvoiceLine(3, 6.21, 5, 'Pineapple'));

  console.log('Total:', invoice.getTotal());
}

function removeItem(): void {
  const invoice = new Invoice();

  invoice.addLine(new InvoiceLine(1, 10.21, 1, 'Orange'));
  invoice.addLine(new InvoiceLine(2, 10.99, 5, 'Banana'));
  invoice.removeLine(1);

  console.log('Total:', invoice.getTotal());
}

function mergeInvoices(): void {
  const invoice1 = new Invoice();

  invoice1.addLine(new InvoiceLine(1, 10.21, 1, 'Blueberries'));

  const invoice2 = new Invoice();

  invoice2.addLine(new InvoiceLine(2, 5.29, 4, 'Orange'));
  invoice2.addLine(new InvoiceLine(3, 9.99, 1, 'Banana'));

  invoice1.merge(invoice2);

  console.log('Total:', invoice1.getTotal());
}

function cloneInvoice(): void {
  const invoice = new Invoice();

  invoice.addLine(new InvoiceLine(1, 0.99, 5, 'Onion'));
  invoice.addLine(new InvoiceLine(2, 10.49, 2, 'Watermelon'));

  const clonedInvoice = invoice.clone();
  console.log('Cloned total:', clonedInvoice.getTotal());
}

function invoiceToString(): void {
  const invoice = new Invoice(new Date(), '1000', [
    new InvoiceLine(1, 1.99, 20, 'Peer'),
    new InvoiceLine(2, 1.54, 10, 'Apple'),
  ]);

  console.log(invoice.toString());
}

main();
