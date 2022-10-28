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

    if (excludes) {
      query.andWhere('cart.id NOT IN (:...ids)', { ids: excludes.map(cart => cart.id) });
    }

    const result = await query.getRawOne();

    return result.reserved_quantity;
  }

  async getDashboard() {
    const query = this.repository
      .createQueryBuilder('product')
      .select(
        "TO_CHAR(date_trunc('month',purchase.created_at),'MON')", 'month'
      )
      .addSelect(
        'COALESCE(SUM(items.quantity), 0)', 'sold_quantity')
      .addSelect(
        'COALESCE(SUM(items.price), 0)', 'total_price')
      .addSelect(
        'COALESCE(SUM(refcoupom.value), 0)', 'total_coupons_generated')
      .addSelect(
        'COALESCE(COUNT(refcoupom), 0)', 'total_coupons_used')
      .innerJoin('product.cart_items', 'items')
      .innerJoin('items.cart', 'cart')
      .innerJoin('cart.purchase', 'purchase')
      .leftJoin('items.refund', 'refund')
      .leftJoin('refund.coupom', 'refcoupom')
      .where(
        "date_part('year', purchase.created_at) = date_part('year', CURRENT_DATE)"
      )
      .groupBy(`date_trunc('month', purchase.created_at)`)

    const result = await query.getRawMany();

    return result;
  }
}
