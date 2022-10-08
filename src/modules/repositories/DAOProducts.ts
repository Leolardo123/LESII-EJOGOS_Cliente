import Product from "@modules/models/products/Product";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOProduct extends DAOAbstract<Product> implements DAOProduct {
  constructor() {
    super(Product);
  }
}
