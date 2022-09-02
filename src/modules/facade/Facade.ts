import Domain from "@modules/models/users/Domain";
import User from "@modules/models/users/User";
import { DAOUser } from "@modules/repositories/DAOUser";
import { IDAO } from "@modules/repositories/interfaces/IDAO";
import AppError from "@shared/errors/AppError";
import IHash from "@shared/interfaces/IHash";
import { IFacade } from "./IFacade";

export class Facade<T extends Domain> implements IFacade {
	private daos: IHash<IDAO>

	constructor(){
		this.daos = {
			"user": new DAOUser(),
		}
	}

	create(entity: Domain): void {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			entity.validate()
			const daoInstance = this.daos[entityName]
			daoInstance.insert(entity);
		}
		return;
	}
	
	update(entity: Domain): void {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			entity.validate()
			const daoInstance = this.daos[entityName]
			daoInstance.update(entity);
		}
		return;
	}
	
	delete(entity: Domain): void {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			entity.validate()
			const daoInstance = this.daos[entityName]
			daoInstance.remove(entity);
		}
		return;
	}

	query(entity: Domain): Domain[] {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			entity.validate()
			const daoInstance = this.daos[entityName]
			return daoInstance.find(entity);
		}
		throw new AppError('Falha ao consultar.')
	}
}