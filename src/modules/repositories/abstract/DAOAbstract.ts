import Domain from "@modules/models/Domain";
import { IFilter } from "@shared/interfaces/DAO/IFilter";
import { IFilterPaginated } from "@shared/interfaces/DAO/IFilterPaginated";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { connection } from "@shared/utils/connection";
import { EntityTarget, Repository } from "typeorm";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { IDAO } from "../interfaces/IDAO";


export abstract class DAOAbstract implements IDAO {
    private repository: Repository<Domain>;

    constructor(entity: EntityTarget<Domain>) {
      this.repository = connection.getRepository(entity);
    }
  
    public async index({
      page = 1,
      limit = 10,
      findParams,
    }: IFilterPaginated<Domain>): Promise<IPaginatedResponse<Domain>> {
      const [results, total] = findParams?.where ?
        await this.repository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
          where: findParams.where
        }) : await this.repository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
        })
      return { results, total, limit, page }
    }
  
    public create(entity: DeepPartial<Domain>): Domain {
      return this.repository.create(entity)
    }
  
    public async findOne({ where, relations }: IFilter<Domain>): Promise<Domain | null> {
      return await this.repository.findOne({
        where,
        relations
      })
    }
  
    public async findAll({ where, relations }: IFilter<Domain>): Promise<Domain[]> {
      return await this.repository.find({
        where,
        relations
      })
    }
  
    public async save(entity: DeepPartial<Domain>): Promise<DeepPartial<Domain>> {
      return await this.repository.save(entity);
    }
  
    public async remove(entity: Domain): Promise<void> {
      await this.repository.remove(entity);
    }
}