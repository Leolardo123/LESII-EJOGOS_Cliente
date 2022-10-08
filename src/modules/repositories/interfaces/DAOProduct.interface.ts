import Product from "@modules/models/products/Product";
import { IFilterPaginated } from "@shared/interfaces/DAO/IFilterPaginated";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { FindOneOptions } from "typeorm";
import { DeepPartial } from "typeorm/common/DeepPartial";

export interface IDAOProduct {
  index({ page, limit, findParams }: IFilterPaginated<Product>): Promise<IPaginatedResponse<Product>>;
  create(entity: DeepPartial<Product>): Product;
  findOne({ where, relations }: FindOneOptions<Product>): Promise<Product | undefined | null>;
  findMany({ where, relations }: FindOneOptions<Product>): Promise<Product[]>;
  save(entity: DeepPartial<Product>): Promise<DeepPartial<Product>>;
  remove(entity: Product): Promise<void>;
}
