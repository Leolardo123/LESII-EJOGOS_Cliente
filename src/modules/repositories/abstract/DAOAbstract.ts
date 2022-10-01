import Domain from "@modules/models/Domain";
import { IFilter } from "@shared/interfaces/DAO/IFilter";
import { IFilterPaginated } from "@shared/interfaces/DAO/IFilterPaginated";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { EntityTarget, Repository, DeepPartial, getRepository, FindOneOptions } from "typeorm";
import { IDAO } from "../interfaces/IDAO";


export abstract class DAOAbstract<T extends Domain> implements IDAO<T> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
      this.repository = getRepository(entity);
    }
  
    public async index({
      page = 1,
      limit = 10,
      findParams,
    }: IFilterPaginated<T>): Promise<IPaginatedResponse<T>> {
      const [results, total] = findParams?.where ?
        await this.repository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
          where: findParams.where,
        }) : await this.repository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
        })
      return { results, total, limit, page }
    }
  
    public create(entity: DeepPartial<T>): T {
      return this.repository.create(entity)
    }
  
    public async findOne({ where, relations }: FindOneOptions<T>): Promise<T | undefined | null> {
      return await this.repository.findOne({
        where,
        relations,
      })
    }
  
    public async findMany({ where, relations }: FindOneOptions<T>): Promise<T[]> {
      return await this.repository.find({
        where,
        relations,
      })
    }
  
    public async save(entity: DeepPartial<T>): Promise<DeepPartial<T>> {
      return await this.repository.save(entity);
    }
  
    public async remove(entity: T): Promise<void> {
      await this.repository.remove(entity);
    }
}