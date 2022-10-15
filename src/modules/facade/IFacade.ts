import Domain from "@modules/models/Domain";

export interface IFacade {
	create(entity: Domain): Promise<string>;
	update(entity: Domain): Promise<string>;
	delete(entity: Domain): Promise<string>;
	findOne(entity: Domain, relations: string[]): Promise<Domain | undefined | null>;
	findMany(entity: Domain, relations: string[]): Promise<Domain[]>;
}