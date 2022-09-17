import Domain from "@modules/models/Domain";
import { DeepPartial } from "typeorm";

export interface IFilter<T extends Domain> {
    where?: DeepPartial<T>,
    relations?: string[],
}