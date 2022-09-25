import Purchase from "@modules/models/sales/Purchase";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOPurchase extends DAOAbstract<Purchase> {
  constructor() {
    super(Purchase);
  }
}
