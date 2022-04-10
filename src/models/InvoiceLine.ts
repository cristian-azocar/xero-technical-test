import deepClone from '../utils/deepClone';

/**
 * Represents the item of an invoice.
 */
export default class InvoiceLine {
  /** The ID of the item. */
  id: number;
  /** The cost of the item. */
  cost: number;
  /** The quantity of the item. */
  quantity: number;
  /** The description of the item. */
  description: string;

  /**
   * Creates a new instance of the InvoiceLine class.
   * @param id The ID of the item.
   * @param cost The cost of the item.
   * @param quantity The quantity of the item.
   * @param description The description of the item.
   */
  constructor(id: number, cost: number, quantity: number, description: string) {
    this.id = id;
    this.cost = cost;
    this.quantity = quantity;
    this.description = description;
  }

  /**
   * Returns the total value.
   * @returns The total value.
   */
  getTotal(): number {
    return this.cost * this.quantity;
  }

  /**
   * Creates a new object that is a deep copy of the current instance.
   * @returns A new object that is a copy of this instance.
   */
  clone(): InvoiceLine {
    return deepClone(this);
  }
}
