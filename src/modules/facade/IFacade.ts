import Domain from "@modules/models/Domain";

export interface IFacade {
    create(entity: Domain): void;
	update(entity: Domain): void;
	delete(entity: Domain): void;
	query(entity: Domain): Domain[];
}