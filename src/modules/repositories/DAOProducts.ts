import Product from "@modules/models/products/Product";
import Cart from "@modules/models/sales/Cart";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOProduct extends DAOAbstract<Product> implements DAOProduct {
  constructor() {
    super(Product);
  }

  async getReservedQuantity(
    product: Product, 
    excludes?: Cart[]
  ): Promise<number> {
    const query = this.repository
    .createQueryBuilder('product')
    .select('SUM(items.quantity)', 'reserved_quantity')
    .innerJoin('product.cart_items', 'items')
    .innerJoin('items.cart', 'cart')
    .where('product.id = :id', { id: product.id })
    .andWhere('cart.isOpen = true')
    .andWhere('items.product_id = :id', { id: product.id })

    if(excludes){
      query.andWhere('cart.id NOT IN (:...ids)', { ids: excludes.map(cart => cart.id) });
    }

    const result = await query.getRawOne();

    return result.reserved_quantity;
  }
}
