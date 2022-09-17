import Domain from "@modules/models/Domain";
import { DeepPartial } from "typeorm";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

export interface IFilter<T extends Domain> {
    where?: FindOptionsWhere<T>,
    relations?: string[],
}