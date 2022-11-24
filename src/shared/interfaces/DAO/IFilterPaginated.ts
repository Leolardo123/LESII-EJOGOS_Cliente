import Domain from "@modules/models/Domain";
import { FindOneOptions } from "typeorm";
export interface IFilterPaginated<T extends Domain> {
    page?: number,
    limit?: number,
    where?: FindOneOptions<T>,
}