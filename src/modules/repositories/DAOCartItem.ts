import CartItem from "@modules/models/sales/CartItem";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOCartItem extends DAOAbstract<CartItem> {
  constructor() {
    super(CartItem);
  }
}
