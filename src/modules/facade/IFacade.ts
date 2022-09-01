import Domain from "@modules/models/users/Domain";

export interface IFacade {
    create(entity: Domain): string;
	update(entity: Domain): string;
	delete(entity: Domain): string;
	query(entity: Domain): Domain[];
}