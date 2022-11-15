import { IGetEntity } from "@modules/controller/viewhelper/interface/IViewHelper";
import Domain from "@modules/models/Domain";

export interface IFacade {
	create(entity: Domain): Promise<string>;
	update(entity: Domain): Promise<string>;
	delete(entity: Domain): Promise<string>;
	findOne(filters: IGetEntity): Promise<Domain | undefined | null>;
	findMany(filters: IGetEntity): Promise<Domain[]>;
}