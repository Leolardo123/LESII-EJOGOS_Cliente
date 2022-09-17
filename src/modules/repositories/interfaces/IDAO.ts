import Domain from "@modules/models/Domain";
import { IFilter } from "@shared/interfaces/DAO/IFilter";
import { IFilterPaginated } from "@shared/interfaces/DAO/IFilterPaginated";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { DeepPartial } from "typeorm/common/DeepPartial";

export interface IDAO {
  index({ page, limit, findParams }: IFilterPaginated<Domain>): Promise<IPaginatedResponse<Domain>>;
  create(entity: DeepPartial<Domain>): Domain;
  findOne({ where, relations }: IFilter<Domain>): Promise<Domain | undefined | null>;
  findMany({ where, relations }: IFilter<Domain>): Promise<Domain[]>;
  save(entity: DeepPartial<Domain>): Promise<DeepPartial<Domain>>;
  remove(entity: Domain): void;
}
