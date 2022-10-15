import Domain from "@modules/models/Domain";
import { FindManyOptions, FindOneOptions } from "typeorm";

export interface IFacade {
	create(entity: Domain): Promise<string>;
	update(entity: Domain): Promise<string>;
	delete(entity: Domain): Promise<string>;
	findOne(
		entity: Domain,
		whereParams: FindManyOptions<Domain>,
	): Promise<Domain | undefined | null>;
	findMany(
		entity: Domain,
		whereParams: FindManyOptions<Domain>,
	): Promise<Domain[]>;
}