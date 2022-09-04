import Domain from "@modules/models/Domain";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOGender } from "@modules/repositories/DAOGender";
import { DAOPerson } from "@modules/repositories/DAOPerson";
import { DAOUser } from "@modules/repositories/DAOUser";
import { IDAO } from "@modules/repositories/interfaces/IDAO";
import { IValidate } from "@modules/validators/IValidate";
import { ValidateAddress } from "@modules/validators/ValidateAddress";
import { ValidateCPF } from "@modules/validators/ValidateCPF";
import { ValidateGender } from "@modules/validators/ValidateGender";
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
		const validateCPF = new ValidateCPF();
		const validateGender = new ValidateGender();
		const validatePerson = new ValidatePerson(
			validateAddress, 
			validatePhone,
			validateCPF
		);
		const validateUser = new ValidateUser(validatePerson);
		//*

		this.daos.gender = new DAOGender();

		this.daos.address = new DAOAddress();
		this.validators.address = validateAddress;

		this.daos.person = new DAOPerson();
		this.validators.person = validatePerson;

		this.daos.user = new DAOUser();
		this.validators.user = validateUser;

		this.daos.gender = new DAOGender();
		this.validators.gender = validateGender;
	}

	async create(entity: Domain): Promise<string> {
		const entityName = entity.constructor.name.toLowerCase();
		if(this.daos[entityName]){
			const validatorInstance = this.validators[entityName];
			await validatorInstance.validate(entity);

			const daoInstance = this.daos[entityName]
			await daoInstance.insert(entity);
			return 'Cadastrado com sucesso';
		}
		throw new Error('Falha ao cadastrar, tipo do pedido não existe.')
	}
	
	async update(entity: Domain): Promise<string> {
		const entityName = entity.constructor.name.toLowerCase();
		if(this.daos[entityName]){
			const validatorInstance = this.validators[entityName];
			await validatorInstance.validate(entity);

			const daoInstance = this.daos[entityName]
			await daoInstance.update(entity);
			return 'Atualizado com sucesso';
		}
		throw new Error('Falha ao atualizar, tipo do pedido não existe.')
	}
	
	async delete(entity: Domain): Promise<string> {
		const entityName = entity.constructor.name.toLowerCase();
		if(this.daos[entityName]){
			const daoInstance = this.daos[entityName]
			await daoInstance.remove(entity);
			return 'Deletado com sucesso';
		}
		throw new Error('Falha ao excluir, tipo do pedido não existe.')
	}

	async query(entity: Domain, where: string): Promise<Domain[]> {
		const entityName = entity.constructor.name.toLowerCase();
		if(this.daos[entityName]){
			const daoInstance = this.daos[entityName]
			return await daoInstance.find(where);
		}
		throw new Error('Falha ao consultar, tipo do pedido não existe.')
	}
}