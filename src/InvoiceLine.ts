import deepCopy from './utils/deepCopy';

export default class InvoiceLine {
  id: number;
  cost: number;
  quantity: number;
  description: string;

  constructor(id: number, cost: number, quantity: number, description: string) {
    this.id = id;
    this.cost = cost;
    this.quantity = quantity;
    this.description = description;
  }

  getTotal(): number {
    return this.cost * this.quantity;
  }

  clone(): InvoiceLine {
    return deepCopy(this);
  }

  toString(): string {
    return [
      `Item: ${this.description}`,
      `Quantity: ${this.quantity}`,
      `Cost: ${this.cost}`,
      `Total: $${this.getTotal()}`,
      '',
    ].join('\n');
  }
}
