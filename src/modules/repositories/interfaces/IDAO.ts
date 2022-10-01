import Domain from "@modules/models/Domain";
import { IFilterPaginated } from "@shared/interfaces/DAO/IFilterPaginated";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { FindOneOptions } from "typeorm";
import { DeepPartial } from "typeorm/common/DeepPartial";

export interface IDAO<T extends Domain> {
  index({ page, limit, findParams }: IFilterPaginated<T>): Promise<IPaginatedResponse<T>>;
  create(entity: DeepPartial<T>): T;
  findOne({ where, relations }: FindOneOptions<T>): Promise<T | undefined | null>;
  findMany({ where, relations }: FindOneOptions<T>): Promise<T[]>;
  save(entity: DeepPartial<T>): Promise<DeepPartial<T>>;
  remove(entity: T): Promise<void>;
}
