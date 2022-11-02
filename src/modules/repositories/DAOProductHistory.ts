import ProductHistory from "@modules/models/products/ProductHistory";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOProductHistory extends DAOAbstract<ProductHistory> implements DAOProductHistory {
  constructor() {
    super(ProductHistory);
  }
}
