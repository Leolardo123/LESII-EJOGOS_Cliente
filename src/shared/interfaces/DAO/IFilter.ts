import Domain from "@modules/models/Domain";
import { DeepPartial, FindOneOptions } from "typeorm";

export interface IFilter<T extends Domain> {
    where?: FindOneOptions<T>,
    relations?: string[],
}