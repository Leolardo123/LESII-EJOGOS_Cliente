import Domain from "@modules/models/Domain";
import { FindConditions } from "typeorm";
import { IFilter } from "./IFilter";

export interface IFilterPaginated<T extends Domain> {
    page?: number,
    limit?: number,
    where?: FindConditions<T>,
}