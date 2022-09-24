import Domain from "@modules/models/Domain";
import { DAOFactory } from "@modules/repositories/factory/DAOFactory";
import { IValidate } from "@modules/validators/IValidate";
import { ValidateAddress } from "@modules/validators/ValidateAddress";
import { ValidateCard } from "@modules/validators/ValidateCard";
import { ValidateCPF } from "@modules/validators/ValidateCPF";
import { ValidateGender } from "@modules/validators/ValidateGender";
import { ValidatePassword } from "@modules/validators/ValidatePassword";
import { ValidatePerson } from "@modules/validators/ValidatePerson";
import { ValidatePhone } from "@modules/validators/ValidatePhone";
import { ValidateUser } from "@modules/validators/ValidateUser";
import IHash from "@shared/interfaces/IHash";
import { IFacade } from "./IFacade";

export class Facade implements IFacade {
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
		const validatePassword = new ValidatePassword();
		const validateUser = new ValidateUser(
			validatePerson, 
			validatePassword
		);
		//*
		const validateCard = new ValidateCard();

		this.validators.address = validateAddress;
		this.validators.person = validatePerson;
		this.validators.user = validateUser;
		this.validators.gender = validateGender;
		this.validators.card = validateCard;
	}

	async getInstance(entity: Domain): Promise<Domain> {
		const entityName = entity.constructor.name.toLowerCase();
		const daoInstance = DAOFactory.getDAO(entityName);
		return daoInstance.create(entity);;
	}

	async create(entity: Domain): Promise<string> {
		const entityName = entity.constructor.name.toLowerCase();
		const validatorInstance = this.validators[entityName];
		await validatorInstance.validate(entity);

		const daoInstance = DAOFactory.getDAO(entityName);
		await daoInstance.save(entity);

		return 'Cadastrado com sucesso';
	}
	
	async update(entity: Domain): Promise<string> {
		const entityName = entity.constructor.name.toLowerCase();
		const validatorInstance = this.validators[entityName];
		await validatorInstance.validate(entity);

		const daoInstance = DAOFactory.getDAO(entityName);
		const entityExists = await daoInstance.findOne({ 
			where: { 
				id: entity.id 
			} 
		});

		if(!entityExists) throw new Error('Não encontrado');
		Object.assign(entityExists, entity);
		await daoInstance.save(entity);

		return 'Atualizado com sucesso';
	}
	
	async delete(entity: Domain): Promise<string> {
		const entityName = entity.constructor.name.toLowerCase();

		const daoInstance = DAOFactory.getDAO(entityName);
		const createdEntity = daoInstance.create(entity);
		await daoInstance.remove(createdEntity);

		return 'Removido com sucesso';
	}

	async findOne(entity: Domain, relations: string[]): Promise<Domain | undefined | null> {
		const entityName = entity.constructor.name.toLowerCase();

		const daoInstance = DAOFactory.getDAO(entityName);
		return await daoInstance.findOne({ where: entity, relations});
	}

	async findMany(entity: Domain, relations: string[]): Promise<Domain[]> {
		const entityName = entity.constructor.name.toLowerCase();

		const daoInstance = DAOFactory.getDAO(entityName);
		return await daoInstance.findMany({ where: entity, relations });
	}
}