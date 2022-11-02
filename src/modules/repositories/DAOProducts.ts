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
    const dated = await this.repository.query(`
      SELECT
        COALESCE(SUM(monthly.total_sales), 0) AS monthly_sales,
        COALESCE(SUM(monthly.total_quantity), 0) AS monthly_quantity,
        COALESCE(SUM(monthly.total_coupom), 0) AS monthly_coupom,
        ARRAY_AGG(TO_JSON(monthly.*)) as months
      FROM
        generate_series(
          current_date, 
          current_date, 
          '1 year'
        ) AS year
      LEFT JOIN
        (
          SELECT
            TO_CHAR(months, 'MON') AS month,
            TO_CHAR(months, 'YYYY') AS year,
            COALESCE(SUM(items.price), 0) AS total_sales,
            COALESCE(SUM(items.quantity), 0) AS total_quantity,
            COALESCE(SUM(coupom.value), 0) AS total_coupom
          FROM 
            generate_series(
              current_date - interval '11 month', 
              current_date, 
              '1 month'
            ) months 
          LEFT JOIN
            tb_purchases purchases ON TO_CHAR(purchases.created_at, 'MON') = TO_CHAR(months, 'MON')
          LEFT JOIN
            tb_item_carts carts ON carts.id = purchases.cart_id
          LEFT JOIN
            tb_carts_items items ON items.cart_id = carts.id
          LEFT JOIN
            coupom ON coupom.purchase_id = purchases.id
          GROUP BY
            month, year, months
          ORDER BY
            months, month
        ) monthly ON true
        GROUP BY
          year.date 
    `)

    const ranking = await this.repository.query(`
      SELECT
        product.name as product_name,
        SUM(items.price) * 100 / year_data.total_sales as percentage_product,
        SUM(items.quantity) * 100 / year_data.total_quantity as percentage_quantity,
        SUM(items.price) as total_product,
        SUM(items.quantity) as total_quantity
      FROM
        tb_products product
      LEFT JOIN
        tb_carts_items items ON items.product_id = product.id
      LEFT JOIN
        tb_item_carts carts ON carts.id = items.cart_id
      LEFT JOIN
        tb_purchases purchases ON purchases.cart_id = carts.id
      LEFT JOIN
        (
          SELECT
            COALESCE(SUM(items.price), 0) AS total_sales,
            COALESCE(SUM(items.quantity), 0) AS total_quantity
          FROM
            tb_carts_items items
          LEFT JOIN
            tb_item_carts carts ON carts.id = items.cart_id
          LEFT JOIN
            tb_purchases purchases ON purchases.cart_id = carts.id
          WHERE
            purchases.created_at BETWEEN current_date - interval '1 year' AND current_date
        ) year_data ON true
      WHERE
        purchases.created_at BETWEEN current_date - interval '1 year' AND current_date
      GROUP BY
        product.name, 
        year_data.total_sales, 
        year_data.total_quantity
      ORDER BY
        total_product DESC
      LIMIT 10  
    `);

    return { dated: dated[0], ranking };
  }
}
