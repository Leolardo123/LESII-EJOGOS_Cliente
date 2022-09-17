import Domain from "@modules/models/Domain";

export interface IFacade {
    create(entity: Domain): Promise<string>;
	update(entity: Domain): Promise<string>;
	delete(entity: Domain): Promise<string>;
	findOne(wntity: Domain, relations: string[]): Promise<Domain | undefined>;
	findMany(wntity: Domain, relations: string[]): Promise<Domain[]>;
}