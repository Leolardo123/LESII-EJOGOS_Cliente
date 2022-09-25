import Cart from "@modules/models/sales/Cart";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOCart extends DAOAbstract<Cart> {
  constructor() {
    super(Cart);
  }
}
