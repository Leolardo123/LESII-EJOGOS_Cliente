import Product from "@modules/models/products/Product";
import Cart from "@modules/models/sales/Cart";
import { DAOAbstract } from "./abstract/DAOAbstract";

interface IProductDashboard {
  start_date?: Date,
  end_date?: Date,
  timespan?: '1 day' | '1 month' | '1 year'
}
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

  async getDashboard({
    start_date = new Date(new Date().getFullYear(), 1, 1),
    end_date = new Date(),
    timespan = '1 month'
  }: IProductDashboard): Promise<any> {
    const dated = await this.repository.query(`
      SELECT
        COALESCE(SUM(monthly.total_sales), 0) AS monthly_sales,
        COALESCE(SUM(monthly.total_quantity), 0) AS monthly_quantity,
        COALESCE(SUM(monthly.total_coupomgen), 0) AS monthly_coupomgen,
        COALESCE(SUM(monthly.total_coupomuse), 0) AS monthly_coupomuse,
        ARRAY_AGG(TO_JSON(monthly.*)) as months
      FROM
        (
          SELECT
            TO_CHAR(months, 'YYYY-MON') AS month,
            COALESCE(SUM(items.price), 0) AS total_sales,
            COALESCE(SUM(items.quantity), 0) AS total_quantity,
            COALESCE(SUM(coupomgen.value), 0) AS total_coupomgen,
            COALESCE(SUM(coupomuse.value), 0) AS total_coupomuse
          FROM 
            generate_series(
              $1::timestamp,
              $2::timestamp,
              $3
            ) months 
          LEFT JOIN
            tb_purchases purchases ON 
            purchases.created_at BETWEEN months AND months + $3 
          LEFT JOIN
            tb_item_carts carts ON carts.id = purchases.cart_id
          LEFT JOIN
            tb_carts_items items ON items.cart_id = carts.id
          LEFT JOIN
            tb_refunds refunds ON refunds.item_id = items.id
          LEFT JOIN
            tb_coupons coupomgen ON refunds.coupom_id = coupomgen.id
          LEFT JOIN
            tb_coupons coupomuse ON refunds.coupom_id = coupomuse.id
          GROUP BY
            month
          ORDER BY
            month
        ) monthly
    `, [
      start_date,
      end_date,
      timespan,
    ]);

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
      INNER JOIN
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
          INNER JOIN
            tb_purchases purchases ON purchases.cart_id = carts.id
          WHERE
            purchases.created_at 
            BETWEEN 
              $1
            AND 
              $2
        ) year_data ON true
      WHERE
        purchases.created_at 
        BETWEEN 
          $1
        AND 
          $2
      GROUP BY
        product.name, 
        year_data.total_sales, 
        year_data.total_quantity
      ORDER BY
        total_product DESC
      LIMIT 10  
    `, [
      start_date,
      end_date,
    ]);

    return { dated: dated[0], ranking, config: { start_date, end_date, timespan } };
  }

  async getDashboardNoGroup(): Promise<any> {
    const dated = await this.repository.query(`
      SELECT
        extract(epoch from purchases.created_at) * 1000 AS timestamp,
        COALESCE(items.price, 0) AS value,
        COALESCE(items.quantity, 0) AS quantity,
        COALESCE(coupomgen.value, 0) AS coupomgen,
        COALESCE(coupomuse.value, 0) AS coupomuse
      FROM 
        tb_purchases purchases
      INNER JOIN
        tb_item_carts carts ON carts.id = purchases.cart_id
      INNER JOIN
        tb_carts_items items ON items.cart_id = carts.id
      LEFT JOIN
        tb_refunds refunds ON refunds.item_id = items.id
      LEFT JOIN
        tb_coupons coupomgen ON refunds.coupom_id = coupomgen.id
      LEFT JOIN
        tb_coupons coupomuse ON refunds.coupom_id = coupomuse.id
      GROUP BY
        purchases.id, items.id, coupomgen.id, coupomuse.id
      ORDER BY
        timestamp
    `);

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
      INNER JOIN
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
          INNER JOIN
            tb_purchases purchases ON purchases.cart_id = carts.id
        ) year_data ON true
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
