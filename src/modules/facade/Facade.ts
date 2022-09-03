import Domain from "@modules/models/Domain";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOPerson } from "@modules/repositories/DAOPerson";
import { DAOUser } from "@modules/repositories/DAOUser";
import { IDAO } from "@modules/repositories/interfaces/IDAO";
import { IValidate } from "@modules/validators/IValidate";
import { ValidateAddress } from "@modules/validators/ValidateAddress";
import { ValidatePerson } from "@modules/validators/ValidatePerson";
import { ValidatePhone } from "@modules/validators/ValidatePhone";
import { ValidateUser } from "@modules/validators/ValidateUser";
import IHash from "@shared/interfaces/IHash";
import { IFacade } from "./IFacade";

export class Facade implements IFacade {
	private daos: IHash<IDAO> = {};
	private validators: IHash<IValidate> = {};

	constructor(){
		/**
		 * Singletons de validação
		 */
		const validateAddress = new ValidateAddress();
		const validatePhone = new ValidatePhone();
		const validatePerson = new ValidatePerson(
			validateAddress, 
			validatePhone
		);
		const validateUser = new ValidateUser(validatePerson);
		//*

		this.daos.user = new DAOUser();
		this.validators.user = validateUser;

		this.daos.person = new DAOPerson();
		this.validators.person = validatePerson;

		this.daos.address = new DAOAddress();
		this.validators.address = validateUser;
	}

	create(entity: Domain): void {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			const daoInstance = this.daos[entityName]
			daoInstance.insert(entity);
			return;
		}
		throw new Error('Falha ao cadastrar, tipo do pedido não existe.')
	}
	
	update(entity: Domain): void {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			const daoInstance = this.daos[entityName]
			daoInstance.update(entity);
			return;
		}
		throw new Error('Falha ao atualizar, tipo do pedido não existe.')
	}
	
	delete(entity: Domain): void {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			const daoInstance = this.daos[entityName]
			daoInstance.remove(entity);
			return;
		}
		throw new Error('Falha ao excluir, tipo do pedido não existe.')
	}

	query(entity: Domain): Domain[] {
		const entityName = entity.constructor.name;
		if(this.daos[entityName]){
			const daoInstance = this.daos[entityName]
			return daoInstance.find(entity);
		}
		throw new Error('Falha ao consultar, tipo do pedido não existe.')
	}
}