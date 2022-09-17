import Domain from "@modules/models/Domain";
import { IFilter } from "./IFilter";

export interface IFilterPaginated<T extends Domain> {
    page?: number,
    limit?: number,
    findParams?: IFilter<T>,
}